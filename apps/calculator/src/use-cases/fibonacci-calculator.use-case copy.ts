import { FibonacciCalculator } from 'src/interfaces/fibonacci-calculator.interface';

export class FibonacciCalculatorUseCase implements FibonacciCalculator {
  calculate(n: number): number {
    // recursivity was not used as for large numbers it takes long time to give a response
    if (n < 1) {
      return 0;
    }
    let a = 0;
    let b = 1;
    for (let i = 1; i < n; ++i) {
      const c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
}
