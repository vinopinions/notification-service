import { Injectable } from '@nestjs/common';
import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { ExpoService } from '../expo/expo.service';
import { TicketService } from '../ticket/ticket.service';
import { TokenService } from './../token/token.service';

@Injectable()
export class NotificationService {
  private expo: Expo;

  constructor(
    expoService: ExpoService,
    private ticketService: TicketService,
    private tokenService: TokenService,
  ) {
    this.expo = expoService.getInstance();
  }

  async sendNotificationToUser(userId: string, body: string) {
    const tokens: string[] = await this.tokenService.getByUserId(userId);
    await Promise.all(
      tokens.map(async (e) => {
        await this.sendNotificationToToken(e, body);
      }),
    );
  }

  async sendNotificationToToken(pushToken: string, body: string) {
    if (!Expo.isExpoPushToken(pushToken)) {
      await this.tokenService.revoke(pushToken);
      return;
    }

    const pushMessage: ExpoPushMessage = {
      to: pushToken,
      sound: 'default',
      body,
    };
    const messages: ExpoPushMessage[] = [pushMessage];
    const tickets: ExpoPushTicket[] =
      await this.expo.sendPushNotificationsAsync(messages);

    console.log(tickets);
    await this.ticketService.createFromExpoTicket(tickets[0], pushToken);
  }
}
