import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AppConfiguration, JoiValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: AppConfiguration().databaseUrl,
      }),
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
