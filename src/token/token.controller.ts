import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TokenDto } from './dtos/token.dto';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @EventPattern('push_token_registered')
  async register(data: TokenDto) {
    await this.tokenService.register(data.userId, data.token);
  }

  @EventPattern('push_token_revoked')
  async revoke(data: TokenDto) {
    await this.tokenService.revoke(data.userId, data.token);
  }
}
