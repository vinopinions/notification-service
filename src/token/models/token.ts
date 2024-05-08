import { IsString } from 'class-validator';

class Token {
  @IsString()
  token: string;
}

export default Token;
