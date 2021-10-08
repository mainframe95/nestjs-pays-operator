import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { Roles } from './role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService,
     AuthService, 
     LocalStrategy,
      JwtStrategy]
})
export class UsersModule {}
