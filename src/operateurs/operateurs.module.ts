import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operateur } from './models/operateur.entity';
import { OperateursController } from './operateurs.controller';
import { OperateursService } from './operateurs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operateur])],
  controllers: [OperateursController],
  providers: [OperateursService]
})
export class OperateursModule { }
