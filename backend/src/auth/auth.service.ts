import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByUsername(username);
        if (!user || !(await this.verifyPassword(pass, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = {
            sub: user.id,
            id: user.id,
            username: user.username,
            roles: user.roles,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, password);
    }
}
