import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenStore } from './entities/token-store.entity';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenStore])],
  providers: [TokenService],
})
export class TokenModule {}
