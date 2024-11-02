import { Module } from '@nestjs/common';
import { CalculatorService } from 'src/services/calculator.service';
import { ParityCheckerUseCase } from 'src/use-cases/parity-checker.use-case';
import { PrimeCheckerUseCase } from 'src/use-cases/prime-checker.use-case';
import { FactorialCalculatorUseCase } from 'src/use-cases/factorial-calculator.use-case';
import { SumCalculatorUseCase } from 'src/use-cases/sum-calculator.use-case';
import { FactorCalculatorUseCase } from 'src/use-cases/factor-calculator.use-case';
import { FibonacciCalculatorUseCase } from 'src/use-cases/fibonacci-calculator.use-case copy';
import { ConfigModule } from '@nestjs/config';
import { CalculatorController } from './controllers/calculator.controller';
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
