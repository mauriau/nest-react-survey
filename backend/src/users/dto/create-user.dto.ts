import {IsArray, IsEmail, IsString} from 'class-validator';
import {Role} from '../../auth/role.enum';

export class CreateUserDto {
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;

    @IsArray()
    roles: Role[];
}
