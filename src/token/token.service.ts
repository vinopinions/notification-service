import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenStore } from './entities/token-store.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenStore)
    private tokenStoreRepository: Repository<TokenStore>,
  ) {}

  async getTokens(userId: string): Promise<string[]> {
    return (await this.tokenStoreRepository.findOne({ where: { userId } }))
      .tokens;
  }

  async addToken(userId: string, token: string): Promise<boolean> {
    const tokenStore: TokenStore = await this.tokenStoreRepository.findOne({
      where: { userId },
    });

    if (tokenStore.tokens.includes(token)) return false;

    tokenStore.tokens.push(token);
    await this.tokenStoreRepository.save(tokenStore);

    return true;
  }

  async revokeToken(userId: string, token: string): Promise<boolean> {
    const tokenStore: TokenStore = await this.tokenStoreRepository.findOne({
      where: { userId },
    });

    if (!tokenStore.tokens.includes(token)) return false;

    tokenStore.tokens = tokenStore.tokens.filter((e) => e !== token);
    await this.tokenStoreRepository.save(tokenStore);

    return true;
  }
}
