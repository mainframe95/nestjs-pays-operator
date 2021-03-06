import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertUserDto } from './models/dto/insertUser.dto';
import { UpdatedUserDto } from './models/dto/updateUser.dto';
import { User } from './models/user.entity';
import { Roles } from './role/role.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Roles)
        private roleRepo: Repository<Roles>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepo.find();
    }

    async createUser(insertUser: InsertUserDto): Promise<User> {
        try {
            console.log('inserty', insertUser)
            const user = new User();
            const userRole = await this.roleRepo.find();
            console.log('role', userRole)
            user.username = insertUser.username;
            user.password = insertUser.password;
            user.email = insertUser.email || null;
            user.userRoles = userRole;
            return await this.userRepo.save(insertUser);
        } catch (err) {
            console.log('error', err)
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate username: ${insertUser.username}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't save`, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async updateUser(updateUser: UpdatedUserDto): Promise<User> {
        const { email, username } = updateUser;
        try {
            const findUser = await this.userRepo.findOne({ where: { username } })
            if (findUser) {
                findUser.email = email;
                return await this.userRepo.save(updateUser);
            }
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate username: ${updateUser.email}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't save`, HttpStatus.BAD_REQUEST);
            }
        }
    }


    /**
     * 
     * @param username 
     * @returns user or 401
     * @description verifie si le username de l'utilisateur existe lors du login
     */
    async verifUser(username: string): Promise<User> {
        try {
            return this.userRepo.findOneOrFail({where: {username}});
        } catch (error) {
            throw new HttpException('username or password invalid',HttpStatus.UNAUTHORIZED);
        }
    }
}
