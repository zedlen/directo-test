import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { ValidateInputMiddleware } from './middleware/validate-input.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env.local'],
    }),
  ],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateInputMiddleware).forRoutes(GatewayController);
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
