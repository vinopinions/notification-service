import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @EventPattern('push_token_registered')
  async register(data: { userId: string; token: string }) {
    await this.tokenService.register(data.userId, data.token);
  }

  @EventPattern('push_token_revoked')
  async revoke(data: { userId: string; token: string }) {
    await this.tokenService.revoke(data.userId, data.token);
  }
}
