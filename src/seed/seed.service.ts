import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeAPIResponse } from './interfaces';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const {
      data: { results },
    } = await this.axios.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=10`,
    );

    results.forEach(({ name, url }) => {
      const no: number = +url.split('/').at(-2);

      console.log({ name, no });
    });

    return results; // 'Seed successfully executed';
  }
}
