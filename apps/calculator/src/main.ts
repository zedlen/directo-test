import { NestFactory } from '@nestjs/core';
import { CalculatorModule } from './calculator.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const rabbitMQURL = configService.get<string>('RABBITMQ_URL');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CalculatorModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQURL],
        queue: 'calculator_queue',
        queueOptions: {
          durable: false,
        },
        prefetchCount: 1,
      },
    },
  );

  await app.listen();
}
bootstrap();
