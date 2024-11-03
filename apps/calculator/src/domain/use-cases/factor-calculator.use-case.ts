import { FactorCalculator } from '@calculator/infrastructure/interfaces/factor-calculator.interface';

export class FactorCalculatorUseCase implements FactorCalculator {
  calculate(n: number): number[] {
    const factors: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  }
}
