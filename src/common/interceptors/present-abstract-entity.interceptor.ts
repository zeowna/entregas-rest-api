import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AbstractEntity } from '../entities';

@Injectable()
export class PresentAbstractEntityInterceptor implements NestInterceptor {
  private present(data: any) {
    if (Array.isArray(data)) {
      return data.map((each) => this.presentIfAbstractEntity(each));
    }

    return this.presentIfAbstractEntity(data);
  }

  private presentIfAbstractEntity(data: any) {
    if (data instanceof AbstractEntity) {
      return data.present();
    }

    return data;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => this.present(data)));
  }
}
