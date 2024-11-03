import { Controller, Get, Param } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
@Controller()
export class GatewayController {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    const rabbitMQURL = this.configService.get<string>('RABBITMQ_URL');
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMQURL],
        queue: 'calculator_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @Get('calculate/:n')
  async calculate(@Param('n') n: string) {
    const number = parseInt(n, 10);
    return await this.client.send({ cmd: 'calculate' }, number);
  }
}
