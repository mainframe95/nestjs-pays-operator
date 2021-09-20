import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './models/dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authServ: AuthService
    ) { }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body(ValidationPipe) loginData: LoginDto): Promise<any> {
        return await this.authServ.validateUser(loginData)
    }

    //   @Post('auth/login')
    //   async login(@Request() req) {
    //     return this.authService.login(req.user);
    //   }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
