import { IsString, IsUUID } from 'class-validator';

export class TokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  token: string;
}
