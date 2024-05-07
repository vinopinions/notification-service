import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenStore } from './entities/token-store.entity';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TokenStore])],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
