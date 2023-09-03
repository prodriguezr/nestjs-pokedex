import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities';
import { AxiosAdapter } from 'src/common/adapters';
import { PokeAPIResponse, SmallPokemon } from './interfaces';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const { results } = await this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=10`,
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
