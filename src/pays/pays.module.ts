import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pays } from './models/pays.entity';
import { PaysController } from './pays.controller';
import { PaysService } from './pays.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pays])],
  controllers: [PaysController],
  providers: [PaysService],
  exports: [PaysService]
})
export class PaysModule {}
