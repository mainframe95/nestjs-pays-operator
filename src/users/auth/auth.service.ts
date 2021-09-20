import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { LoginDto } from './models/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(loginData: LoginDto): Promise<any> {
        const { username, password } = loginData;
        const user = await this.usersService.verifUser(username);
        if (user && user.password === password) {
            const payload = {...user};
            return {
                access_token: this.jwtService.sign(payload),
                user
            };
        }
        return null;
    }

    async login(user: any) {
        const payload = user;
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
