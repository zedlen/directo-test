import { Inject, Injectable } from '@nestjs/common';
import {
  ParityChecker,
  PrimeChecker,
  FactorialCalculator,
  SumCalculator,
  FactorCalculator,
  FibonacciCalculator,
} from '@calculator/infrastructure/interfaces';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject('ParityChecker') private readonly parityChecker: ParityChecker,
    @Inject('PrimeChecker') private readonly primeChecker: PrimeChecker,
    @Inject('FactorialCalculator')
    private readonly factorialCalculator: FactorialCalculator,
    @Inject('SumCalculator') private readonly sumCalculator: SumCalculator,
    @Inject('FactorCalculator')
    private readonly factorCalculator: FactorCalculator,
    @Inject('FibonacciCalculator')
    private readonly fibonacciCalculator: FibonacciCalculator,
  ) {}

  async calculate(n: number) {
    return {
      isPair: this.parityChecker.isPair(n),
      isPrime: this.primeChecker.isPrime(n),
      factorial: this.factorialCalculator.calculate(n),
      sumN: this.sumCalculator.calculate(n),
      factors: this.factorCalculator.calculate(n),
      fibonacci: this.fibonacciCalculator.calculate(n),
    };
  }
}
