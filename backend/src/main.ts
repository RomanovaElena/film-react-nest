import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER || 'tskv';
  const logger =
    loggerType === 'json'
      ? new JsonLogger()
      : loggerType === 'dev'
      ? new DevLogger()
      : new TskvLogger();

  app.useLogger(logger);
  
  await app.listen(3000);
}
bootstrap();