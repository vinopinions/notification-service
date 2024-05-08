import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { RegisterTokenDto } from './dtos/register-token.dto';
import { RevokeTokenDto } from './dtos/revoke-token.dto';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @EventPattern('push_token_registered')
  async register(data: RegisterTokenDto) {
    await this.tokenService.register(data.token, data.userId);
  }

  @EventPattern('push_token_revoked')
  async revoke(data: RevokeTokenDto) {
    await this.tokenService.revoke(data.token);
  }
}
