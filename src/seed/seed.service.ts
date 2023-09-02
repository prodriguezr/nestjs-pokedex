import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse, SmallPokemon } from './interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const {
      data: { results },
    } = await this.axios.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=1000000`,
    );

    const smallPokemons: SmallPokemon[] = [];

    results.forEach(async ({ name, url }) => {
      const no: number = +url.split('/').at(-2);

      smallPokemons.push({ name, no });
    });

    await this.pokemonModel.insertMany(smallPokemons);

    return 'Seed successfully executed';
  }
}
