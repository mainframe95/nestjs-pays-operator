import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface Response<T> {
    datas: T;
}
/**
 * @description recupere la response de tout les requete effectuer qui est data
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        console.log('hostname', request.hostname);
        console.log('body', request.body);
        console.log('user', request.user);
        console.log('params', request.params);
        console.log('query', request.query);
        console.log('statusCode', request.statusCode);
        console.log('ip', request.ip);
        console.log('method', request.method);
        console.log('protocol', request.protocol);
        console.log('rawHeaders', request.rawHeaders);
        console.log('transform')
        const classExec = context.getClass();
        // la fonction qui a été executé
        const functionExec = context.getHandler();
        const currentUsers = context.getArgs()[0].user


        const req = context.switchToHttp().getRequest().originalUrl
        // .url
        // method
        // originalUrl
        // params
        // query
        // body
        // route
        // console.log('currentUsers', currentUsers)

        return next.handle().pipe(map(datas => {
            // autre traitement persolaliser    
            return datas;
        }));
    }
}