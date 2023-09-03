import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from './entities';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [ConfigService, PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: pokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
