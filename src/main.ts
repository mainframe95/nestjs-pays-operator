import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './interceptors/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:  {origin: '*'}
    // peu etre customiser pour ecrire dans un fichier de log
    // logger: new CustomLogger(),
  });

  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
