import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertPaysDto } from './models/dto/insertPays.dto';
import { UpdatedPaysDto } from './models/dto/updatePays.dto';
import { Pays } from './models/pays.entity';

@Injectable()
export class PaysService {
    constructor(
        @InjectRepository(Pays)
        private PaysRepo: Repository<Pays>
    ) {}

    async findAll(): Promise<any> {
        return await this.PaysRepo.find();
    }

    async createPays(data: InsertPaysDto): Promise<Pays> {
        try {
            return await this.PaysRepo.save(data);
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

}
