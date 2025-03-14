import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { SurveysModule } from './surveys/surveys.module';
import { UsersModule } from './users/users.module';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./auth/role.guard";
import {UsersController} from "./users/users.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: parseInt(process.env.DATABASE_PORT),
      username: 'root',
      password: 'root',
      database: 'survey',
      autoLoadEntities: true,
      synchronize: true
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UsersModule,
    SurveysModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
