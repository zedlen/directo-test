import { Module } from '@nestjs/common';
import { CalculatorService } from '@calculator/application/services/calculator.service';
import { ParityCheckerUseCase } from '@calculator/domain/use-cases/parity-checker.use-case';
import { PrimeCheckerUseCase } from '@calculator/domain/use-cases/prime-checker.use-case';
import { FactorialCalculatorUseCase } from '@calculator/domain/use-cases/factorial-calculator.use-case';
import { SumCalculatorUseCase } from '@calculator/domain/use-cases/sum-calculator.use-case';
import { FactorCalculatorUseCase } from '@calculator/domain/use-cases/factor-calculator.use-case';
import { FibonacciCalculatorUseCase } from '@calculator/domain/use-cases/fibonacci-calculator.use-case copy';
import { ConfigModule } from '@nestjs/config';
import { CalculatorController } from '@calculator/infrastructure/controllers/calculator.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env.local'],
    }),
  ],
  controllers: [CalculatorController],
  providers: [
    CalculatorService,
    { provide: 'ParityChecker', useClass: ParityCheckerUseCase },
    { provide: 'PrimeChecker', useClass: PrimeCheckerUseCase },
    {
      provide: 'FactorialCalculator',
      useClass: FactorialCalculatorUseCase,
    },
    { provide: 'SumCalculator', useClass: SumCalculatorUseCase },
    { provide: 'FactorCalculator', useClass: FactorCalculatorUseCase },
    {
      provide: 'FibonacciCalculator',
      useClass: FibonacciCalculatorUseCase,
    },
  ],
  exports: [CalculatorService], // Exporta CalculatorService para que GatewayModule lo use
})
export class CalculatorModule {}
