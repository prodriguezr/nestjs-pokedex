import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Pokemon } from './entities';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (err) {
      this.handleExceptions(err);
    }
  }

  async findAll({ limit = 10, skip = 0 }: PaginationDto) {
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(id: string) {
    let pokemon: Pokemon;

    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel
        .findOne({
          no: id,
        })
        .select('-__v');
    }
    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id).select('-__v');
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel
        .findOne({
          name: id.toLowerCase().trim(),
        })
        .select('-__v');
    }

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no ${id} is not found`,
      );

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (err) {
      this.handleExceptions(err);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new NotFoundException(`Pokemon with id '${id}' is not found`);

    return;
  }

  private handleExceptions(err: any) {
    if (err.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists => ${JSON.stringify(err.keyValue)}`,
      );
    } else {
      console.log(err);

      throw new InternalServerErrorException(`An error has ocurred`);
    }
  }
}
