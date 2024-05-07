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

  async get(userId: string): Promise<string[]> {
    return (await this.tokenStoreRepository.findOne({ where: { userId } }))
      .tokens;
  }

  async register(userId: string, token: string): Promise<boolean> {
    let tokenStore: TokenStore | null = await this.tokenStoreRepository.findOne(
      {
        where: { userId },
      },
    );

    if (tokenStore === null)
      tokenStore = this.tokenStoreRepository.create({
        userId,
        tokens: [],
      });

    if (tokenStore.tokens.includes(token)) return false;

    tokenStore.tokens.push(token);
    await this.tokenStoreRepository.save(tokenStore);

    return true;
  }

  async revoke(userId: string, token: string): Promise<boolean> {
    const tokenStore: TokenStore | null =
      await this.tokenStoreRepository.findOne({
        where: { userId },
      });

    if (tokenStore === null || !tokenStore.tokens.includes(token)) return false;

    tokenStore.tokens = tokenStore.tokens.filter((e) => e !== token);
    await this.tokenStoreRepository.save(tokenStore);

    return true;
  }
}
