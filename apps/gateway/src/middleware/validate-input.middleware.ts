import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateInputMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { n } = req.params;
    const number = parseInt(n as string, 10);

    if (!n || isNaN(number) || number <= 0) {
      return res
        .status(400)
        .json({ error: 'Input must be a positive integer' });
    }
    next();
  }
}
