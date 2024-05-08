import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Expo from 'expo-server-sdk';

@Injectable()
export class ExpoService {
  private expo: Expo;

  constructor(configService: ConfigService) {
    this.expo = new Expo({
      accessToken: configService.getOrThrow('EXPO_ACCESS_TOKEN'),
    });
  }

  getInstance(): Expo {
    return this.expo;
  }
}
