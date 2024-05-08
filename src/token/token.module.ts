import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from './entities/token-info.entity';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo])],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
