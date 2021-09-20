import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pays } from 'src/pays/models/pays.entity';
import { PaysService } from 'src/pays/pays.service';
import { Repository } from 'typeorm';
import { InsertOperateurDto } from './models/dto/insertUser.dto';
import { UpdatedOperateurDto } from './models/dto/updateUser.dto';
import { Operateur } from './models/operateur.entity';

@Injectable()
export class OperateursService {
    constructor(
        @InjectRepository(Operateur)
        private operateurRepo: Repository<Operateur>,
        private paysServ: PaysService
    ) { }

    async findAll(): Promise<Operateur[]> {
        return await this.operateurRepo.find({ relations: ['pays'] })
    }

    async createOperateur(data: InsertOperateurDto): Promise<Operateur> {
        const { label, nbreClients, paysId } = data;
        try {
            const pays = await this.paysServ.findBtyIds(paysId);;
            const operateur = new Operateur();
            operateur.label = label;
            operateur.nbreClients = nbreClients;
            operateur.pays = pays;
            return await this.operateurRepo.save(operateur);
        } catch (err) {
            if (err.sqlState === '23000') {
                throw new HttpException(`can't duplicate Operateur: ${data.label}`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(`can't save`, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async updateOperateur(data: UpdatedOperateurDto): Promise<Operateur> {
        const { id, label, nbreClients, paysId } = data;
        try {
            const findOperateur = await this.operateurRepo.findOne(id);
            if (findOperateur) {
                findOperateur.label = label;
                findOperateur.nbreClients = nbreClients;
                findOperateur.pays = await this.paysServ.findBtyIds(paysId);
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
