import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenInfo } from './entities/token-info.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenInfo)
    private tokenInfoRepository: Repository<TokenInfo>,
  ) {}

  async getByUserId(userId: string): Promise<string[]> {
    const tokenInfos: TokenInfo[] = await this.tokenInfoRepository.find({
      where: { userId },
    });

    return tokenInfos.map((info) => info.token);
  }

  async register(token: string, userId: string): Promise<boolean> {
    let tokenInfo: TokenInfo | null = await this.tokenInfoRepository.findOne({
      where: { token },
    });

    if (tokenInfo !== null) {
      return false;
    }

    tokenInfo = this.tokenInfoRepository.create({
      token,
      userId,
    });

    await this.tokenInfoRepository.save(tokenInfo);

    return true;
  }

  async revoke(token: string): Promise<boolean> {
    const tokenInfo: TokenInfo | null = await this.tokenInfoRepository.findOne({
      where: { token },
    });
    if (tokenInfo === null) return false;
    await this.tokenInfoRepository.delete(tokenInfo);
    return true;
  }
}
