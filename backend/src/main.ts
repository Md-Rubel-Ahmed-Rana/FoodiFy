import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // middlewares
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.use(morgan('dev'));
  const port = configService.get('PORT') && Number(configService.get('PORT'));
  await app.listen(port);
}
bootstrap();
