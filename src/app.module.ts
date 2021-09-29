import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PaysModule } from './pays/pays.module';
import { OperateursModule } from './operateurs/operateurs.module';
import { User } from './users/models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pays } from './pays/models/pays.entity';
import { Operateur } from './operateurs/models/operateur.entity';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './interceptors/http-error.filter';
import { Roles } from './users/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'jmensah',
      entities: [
        User,
        Pays,
        Operateur,
        Roles
      ],
      synchronize: true,
    }),
    UsersModule,
    PaysModule,
    OperateursModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter 
    // }
  ],
})
export class AppModule { }
