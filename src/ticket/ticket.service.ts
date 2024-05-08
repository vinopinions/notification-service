import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import Expo, { ExpoPushTicket } from 'expo-server-sdk';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ExpoService } from '../expo/expo.service';
import { TokenService } from '../token/token.service';
import Ticket from './entities/Ticket.entity';

@Injectable()
export class TicketService {
  private expo: Expo;

  constructor(
    expoService: ExpoService,
    private tokenService: TokenService,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {
    this.expo = expoService.getInstance();
  }

  async registerTickets(expoTickets: ExpoPushTicket[]) {
    const tickets: Ticket[] = [];

    for (const expoTicket of expoTickets) {
      if (expoTicket.status === 'ok')
        tickets.push(this.ticketRepository.create({ id: expoTicket.id }));
    }

    if (tickets.length === 0) return;

    await this.ticketRepository.save(tickets);
  }

  async createFromExpoTicket(expoTicket: ExpoPushTicket, token: string) {
    if (expoTicket.status !== 'ok') return;

    const ticket: Ticket = this.ticketRepository.create({
      id: expoTicket.id,
      token,
    });
    await this.ticketRepository.save(ticket);
  }

  async createFromExpoTickets(expoTickets: ExpoPushTicket[], token: string) {
    const tickets: Ticket[] = [];

    for (const expoTicket of expoTickets) {
      if (expoTicket.status === 'ok') {
        tickets.push(
          this.ticketRepository.create({ id: expoTicket.id, token }),
        );
      }
    }

    await this.ticketRepository.save(tickets);
  }

  async delete(ticket: Ticket) {
    await this.ticketRepository.delete({
      where: {
        id: ticket.id,
      },
    } as FindOptionsWhere<Ticket>);
  }

  @Cron('0 */15 * * * *', {
    name: 'ticket-checking',
  })
  async checkAllTickets() {
    const tickets: Ticket[] = await this.ticketRepository.find();
    console.log(`Checking ${tickets.length} tickets`);
    await this.check(tickets);
  }

  // https://docs.expo.dev/push-notifications/sending-notifications/#check-push-receipts-for-errors
  async check(tickets: Ticket[]) {
    const receiptIdChunks: string[][] =
      this.expo.chunkPushNotificationReceiptIds(tickets.map((e) => e.id));

    for (const chunk of receiptIdChunks) {
      try {
        const receipts =
          await this.expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const ticket = tickets.find((e) => e.id === receiptId);
          // if a receipt is present it means it has been processed by expo, so we can delete the ticket
          // https://www.reddit.com/r/expo/comments/112y6xf/expo_notification_push_receipts_is_there_a/
          await this.delete(ticket);
          const receipt = receipts[receiptId];
          if (receipt.status === 'error') {
            if (receipt.details && receipt.details.error) {
              // https://docs.expo.dev/push-notifications/sending-notifications/#push-receipt-errors
              switch (receipt.details.error) {
                case 'DeviceNotRegistered':
                  await this.tokenService.revoke(ticket.token);
                  break;
                default:
                  console.error(`The error code is ${receipt.details.error}`);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
