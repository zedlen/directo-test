import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CalculatorService } from '../services/calculator.service';

@Controller()
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @MessagePattern({ cmd: 'calculate' })
  calculate(@Payload() data: number) {
    const response = this.calculatorService.calculate(data);
    return response;
  }
}
