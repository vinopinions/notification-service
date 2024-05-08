import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from './database/database.module';
import { ExpoModule } from './expo/expo.module';
import { ExpoService } from './expo/expo.service';
import { NotificationModule } from './notification/notification.module';
import { TicketModule } from './ticket/ticket.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    TokenModule,
    NotificationModule,
    TicketModule,
    ExpoModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
    ExpoService,
  ],
})
export class AppModule {}
