import { NestFactory } from '@nestjs/core';
import { GatewayModule } from '@gateway/gateway.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const rabbitMQURL = configService.get<string>('RABBITMQ_URL');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      name: 'CALCULATOR_CLIENT',
      urls: [rabbitMQURL],
      queue: 'calculator_queue',
    },
  });
  await app.listen(3000);
}
bootstrap();
