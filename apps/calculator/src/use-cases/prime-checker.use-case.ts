import { PrimeChecker } from 'src/interfaces/prime-checker.interface';

export class PrimeCheckerUseCase implements PrimeChecker {
  isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
}
