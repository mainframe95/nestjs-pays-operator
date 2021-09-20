import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './models/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(lofinDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(lofinDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}