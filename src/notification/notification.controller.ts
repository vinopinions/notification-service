import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import FriendRequestAcceptedDto from './dtos/friend-request-accepted.dto';
import FriendRequestSentDto from './dtos/friend-request-sent.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @EventPattern('friend_request_sent')
  async sendFriendRequestSentNotification(data: FriendRequestSentDto) {
    await this.notificationService.sendNotificationToUser(
      data.receiverId,
      `🚀 ${data.senderName} has sent you a friend request!`,
    );
  }

  @EventPattern('friend_request_accepted')
  async sendFriendRequestAcceptNotification(data: FriendRequestAcceptedDto) {
    await this.notificationService.sendNotificationToUser(
      data.accepteeId,
      `🚀 ${data.accepterName} has accepted your friend request!`,
    );
  }
}
