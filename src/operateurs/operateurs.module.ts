import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pays } from 'src/pays/models/pays.entity';
import { PaysService } from 'src/pays/pays.service';
import { Operateur } from './models/operateur.entity';
import { OperateursController } from './operateurs.controller';
import { OperateursService } from './operateurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operateur, Pays])],
  controllers: [OperateursController],
  providers: [OperateursService, PaysService]
})
export class OperateursModule { }
