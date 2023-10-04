import {
	BadRequestException,
	Injectable,
	NestMiddleware
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		if (isNaN(Number(id)) || Number(id) <= 0) {
			throw new BadRequestException('It is not a number ');
		}
		next();
	}
}
