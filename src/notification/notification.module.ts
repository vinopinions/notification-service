import { Module } from '@nestjs/common';
import { ExpoModule } from '../expo/expo.module';
import { TicketModule } from '../ticket/ticket.module';
import { TokenModule } from '../token/token.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [ExpoModule, TicketModule, TokenModule],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
