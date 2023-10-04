import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
	after = Date.now();
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			tap(() => {
				const request = context.switchToHttp().getRequest();
				request.Authentication = 'Beare 1234567890';
				console.log(request.Authentication);
				console.log(
					`Executou em ${Date.now() - this.after} milissegundos`
				);
			})
		);
	}
}
