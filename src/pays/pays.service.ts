import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { Repository } from 'typeorm';
import { InsertPaysDto } from './models/dto/insertPays.dto';
import { UpdatedPaysDto } from './models/dto/updatePays.dto';
import { Pays } from './models/pays.entity';

@UseGuards(JwtAuthGuard)
@Injectable()
export class PaysService {
    constructor(
        @InjectRepository(Pays)
        private PaysRepo: Repository<Pays>
    ) {}

    async findAll(): Promise<any> {
        return await this.PaysRepo.find({relations: ['operateurs']});
    }

    async createPays(data: InsertPaysDto): Promise<Pays> {
        const { label } = data;
        try {
            const pays = new Pays();
            pays.label = label;
            return await this.PaysRepo.save(pays);
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate pays: ${data.label}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't save`, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async updatePays(data: UpdatedPaysDto): Promise<Pays> {
        const { id, label } = data;
        try {
            const findPays = await this.PaysRepo.findOne(id);
            if (findPays) {
                findPays.label = label;
                return await this.PaysRepo.save(findPays);
            }
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate pays: ${data.label}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't update`, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async findOne(id: number): Promise<Pays> {
        try {
            return this.PaysRepo.findOne(id);
        } catch (err) {
            throw new HttpException(`not found pays`, HttpStatus.NOT_FOUND);
        }
    }

    async findBtyIds(paysId: Array<number>): Promise<Pays[]> {
        try {
            return this.PaysRepo.findByIds(paysId);
        } catch (err) {
            throw new HttpException(`not found pays`, HttpStatus.NOT_FOUND);
        }
    }

}
