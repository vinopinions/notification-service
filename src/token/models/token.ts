import { Matches } from 'class-validator';

const EXPONENT_PUSH_TOKEN_REGEX = /^ExponentPushToken\[.+\]$/;

class Token {
  @Matches(EXPONENT_PUSH_TOKEN_REGEX)
  token: string;
}

export default Token;
