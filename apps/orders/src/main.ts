import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeMiddlewares } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(OrdersModule);
  initializeMiddlewares(app);
  await app.listen(3000);
}
bootstrap();
