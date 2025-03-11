import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getMessage() {
    return { message: 'Welcome to my NestJS API!' };
  }
}