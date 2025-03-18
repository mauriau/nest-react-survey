import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Survey example')
      .setDescription('The survey API description')
      .setVersion('1.0')
      .addTag('survey')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // Enable CORS
  app.enableCors({
    origin: 'http://127.0.0.1:3001',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
  console.log('NestJS Server is running on http://localhost:3000');
}
bootstrap();