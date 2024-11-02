import { FactorialCalculator } from 'src/interfaces/factorial-calculator.interface';

export class FactorialCalculatorUseCase implements FactorialCalculator {
  calculate(n: number): number {
    if (n <= 1) return 1;
    return n * this.calculate(n - 1);
  }
}
