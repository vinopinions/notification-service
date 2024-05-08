import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpoModule } from '../expo/expo.module';
import { TokenModule } from '../token/token.module';
import Ticket from './entities/Ticket.entity';
import { TicketService } from './ticket.service';

@Module({
  imports: [ExpoModule, TokenModule, TypeOrmModule.forFeature([Ticket])],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
