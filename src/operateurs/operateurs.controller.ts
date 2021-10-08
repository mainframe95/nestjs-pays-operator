import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { InsertOperateurDto } from './models/dto/insertUser.dto';
import { UpdatedOperateurDto } from './models/dto/updateUser.dto';
import { Operateur } from './models/operateur.entity';
import { OperateursService } from './operateurs.service';

@UseGuards(JwtAuthGuard)
@Controller('operateurs')
export class OperateursController {
    constructor(private operateurServ: OperateursService) { }

    @Get()
    async findAll(): Promise<Operateur[]> {
        return await this.operateurServ.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Operateur> {
        console.log('id', id)
    return await this.operateurServ.findOne(id);
    }

    @Post()
    async createOperateur(
        @Body(ValidationPipe) data: InsertOperateurDto,
    ): Promise<Operateur> {
        return await this.operateurServ.createOperateur(data);
    }

    @Patch()
    async updateOperateur(
        @Body(ValidationPipe) data: UpdatedOperateurDto,
    ): Promise<Operateur> {
        return await this.operateurServ.updateOperateur(data);
    }

    @Delete(':id')
    async deteleteOperator(@Param('id') id): Promise<boolean> {
        return await this.operateurServ.deteleteOperator(id);
    }

}
