import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Public} from '../auth/constants';
import {QueryFailedError} from 'typeorm';
import {RuntimeException} from '@nestjs/core/errors/exceptions';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {

        try {
            return this.usersService.create(createUserDto);
        } catch (e) {
            if (e instanceof QueryFailedError) {
                throw new RuntimeException('this user already exist');
            }
        }
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
