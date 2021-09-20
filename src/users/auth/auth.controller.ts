import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authServ: AuthService
    ) {}

    @Post('login')
    async login(): Promise<any> {
        return;
    }
}
