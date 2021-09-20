import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertOperateurDto } from './models/dto/insertUser.dto';
import { UpdatedOperateurDto } from './models/dto/updateUser.dto';
import { Operateur } from './models/operateur.entity';

@Injectable()
export class OperateursService {
    constructor(
        @InjectRepository(Operateur)
        private operateurRepo: Repository<Operateur>
    ) {}

    async findAll(): Promise<Operateur[]> {
        return await this.operateurRepo.find();
    }

    async createOperateur(data: InsertOperateurDto): Promise<Operateur> {
        const { label, nbreClients } = data;
        try {
            const operateur = new Operateur();
            operateur.label = label;
            operateur.nbreClients = nbreClients;
            return await this.operateurRepo.save(data);
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate Operateur: ${data.label}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't save`, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async updateOperateur(data: UpdatedOperateurDto): Promise<Operateur> {

        const { id, label, nbreClients } = data;
        try {
            const findOperateur = await this.operateurRepo.findOne(id);
            if (findOperateur) {
                findOperateur.label = label;
                findOperateur.nbreClients = nbreClients;
                return await this.operateurRepo.save(findOperateur);
            }
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate Operateur: ${data.label}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't update`, HttpStatus.BAD_REQUEST);
            }
        }
    }
}
