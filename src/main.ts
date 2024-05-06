import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: configService.getOrThrow('REDIS_HOSTNAME'),
        port: configService.getOrThrow('REDIS_PORT'),
      },
    },
  );
  await app.listen();
}
bootstrap();
