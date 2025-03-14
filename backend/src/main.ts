import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://127.0.0.1:3001',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
  });

  await app.listen(3000);
  console.log('NestJS Server is running on http://localhost:3000');
}
bootstrap();