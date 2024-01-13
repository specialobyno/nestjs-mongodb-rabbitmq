import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { AuthModule, BILLING_SERVICE, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RmqModule.register({ name: BILLING_SERVICE }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
    }),
    AuthModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
