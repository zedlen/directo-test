import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CalculatorService } from '@calculator/application/services/calculator.service';
import { Calculation } from '@calculator/infrastructure/interfaces/calculation.interface';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @MessagePattern({ cmd: 'calculate' })
  calculate(@Payload() data: number): Promise<Calculation> {
    return this.calculatorService.calculate(data);
  }
}
