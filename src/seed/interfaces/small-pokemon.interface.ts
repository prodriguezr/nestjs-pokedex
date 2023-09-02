import { SimplePokemon } from './pokemon-response.interface';

export type SmallPokemon = Omit<SimplePokemon, 'url'> & { no: number };
