import { Body, Controller, Get, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Roles } from './role/decorators/roles.decorator';
import { Role } from './role/enum/role.enum';
import { InsertUserDto } from './models/dto/insertUser.dto';
import { UpdatedUserDto } from './models/dto/updateUser.dto';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { RolesGuard } from './role/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    
    constructor(
        private userServ: UsersService
    ) {}

    @Get()
    // @Roles(Role.Admin)
    async findAll(): Promise<User[]> {
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
