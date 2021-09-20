import { Body, Controller, Get, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { InsertPaysDto } from './models/dto/insertPays.dto';
import { UpdatedPaysDto } from './models/dto/updatePays.dto';
import { Pays } from './models/pays.entity';
import { PaysService } from './pays.service';

@UseGuards(JwtAuthGuard)
@Controller('pays')
export class PaysController {

    constructor(
        private paysServ: PaysService
    ) {}

    @Get()
    async findAll(): Promise<Pays[]> {
        return await this.paysServ.findAll();
    }

    @Post()
    async createPays(@Body(ValidationPipe) data: InsertPaysDto ): Promise<Pays> {
        return await this.paysServ.createPays(data)
    }

    @Patch()
    async updatePays(@Body(ValidationPipe) data: UpdatedPaysDto): Promise<Pays> {
        return await this.paysServ.updatePays(data);
    }
}
