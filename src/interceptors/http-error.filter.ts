import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

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

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}