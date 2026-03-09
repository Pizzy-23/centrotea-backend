import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';

import { PatientsModule } from './modules/patients/patients.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { WorkshopsModule } from './modules/workshops/workshops.module';
import { EvolutionsModule } from './modules/evolutions/evolutions.module';
import { PIAModule } from './modules/pia/pia.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Magia para testarmos nossas queries na interface do Apollo!
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Apenas para dev, em prod usar migrations
      }),
    }),
    SharedModule,
    PatientsModule,
    UsersModule,
    AuthModule,
    ProfessionalsModule,
    WorkshopsModule,
    EvolutionsModule,
    PIAModule,
  ],
})
export class AppModule {}
