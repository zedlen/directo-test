import { SumCalculator } from 'src/interfaces/sum-calculator.interface';

export class SumCalculatorUseCase implements SumCalculator {
  calculate(n: number): number {
    //Using the formula for the sum of consecutive numbers till n
    return (n * (n + 1)) / 2;
  }
}
