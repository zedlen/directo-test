import { ParityChecker } from '@calculator/infrastructure/interfaces/parity-checker.interface';

export class ParityCheckerUseCase implements ParityChecker {
  isPair(n: number): boolean {
    return n % 2 === 0;
  }
}
