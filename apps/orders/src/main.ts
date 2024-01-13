import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeMiddlewares } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(OrdersModule);

  initializeMiddlewares(app);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
