import { Body, Controller, Get, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InsertOperateurDto } from './models/dto/insertUser.dto';
import { UpdatedOperateurDto } from './models/dto/updateUser.dto';
import { Operateur } from './models/operateur.entity';
import { OperateursService } from './operateurs.service';

@Controller('operateurs')
export class OperateursController {

    constructor(
        private operateurServ: OperateursService
    ) {}

    @Get()
    async findAll(): Promise<Operateur[]> {
        return await this.operateurServ.findAll();
    }

    @Post()
    async createOperateur(@Body(ValidationPipe) data: InsertOperateurDto ): Promise<Operateur> {
        return await this.operateurServ.createOperateur(data)
    }

    @Patch()
    async updateOperateur(@Body(ValidationPipe) data: UpdatedOperateurDto): Promise<Operateur> {
        return await this.operateurServ.updateOperateur(data);
    }
}
