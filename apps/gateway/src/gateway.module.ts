import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GatewayController } from '@gateway/infrastructure/controllers/gateway.controller';
import { ValidateInputMiddleware } from '@gateway/application/middlewares/validate-input.middleware';
import { LoggerMiddleware } from '@gateway/application/middlewares/logger.middleware';
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
