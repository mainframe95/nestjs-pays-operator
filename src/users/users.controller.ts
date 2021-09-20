import { Body, Controller, Get, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InsertUserDto } from './models/dto/insertUser.dto';
import { UpdatedUserDto } from './models/dto/updateUser.dto';
import { User } from './models/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor(
        private userServ: UsersService
    ) {}

    @Get()
    async findAll(@Body(ValidationPipe) insertUser: InsertUserDto): Promise<User[]> {
        return await this.userServ.findAll();
    }
    @Post()
    async createUser(@Body(ValidationPipe) insertUser: InsertUserDto): Promise<User> {
        return await this.userServ.createUser(insertUser);
    }
    @Patch()
    async updateUser(@Body(ValidationPipe) insertUser: UpdatedUserDto): Promise<User> {
        return await this.userServ.updateUser(insertUser);
    }
}
