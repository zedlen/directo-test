import { Inject, Injectable } from '@nestjs/common';
import { ParityChecker } from 'src/interfaces/parity-checker.interface';
import { PrimeChecker } from 'src/interfaces/prime-checker.interface';
import { FactorialCalculator } from 'src/interfaces/factorial-calculator.interface';
import { SumCalculator } from 'src/interfaces/sum-calculator.interface';
import { FactorCalculator } from 'src/interfaces/factor-calculator.interface';
import { FibonacciCalculator } from 'src/interfaces/fibonacci-calculator.interface';

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

  calculate(n: number) {
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
