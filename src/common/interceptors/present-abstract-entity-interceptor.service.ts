import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AbstractEntity } from '../entities';
import { AbstractFindEntitiesResponse } from '../services';

@Injectable()
export class PresentEntityInterceptor implements NestInterceptor {
  private presentIfAbstractEntity(data: any) {
    if (data instanceof AbstractEntity) {
      return data.present();
    }

    return data;
  }

  private present(data: any) {
    if (data instanceof AbstractFindEntitiesResponse) {
      return {
        ...data,
        list: data.list.map((each) => this.presentIfAbstractEntity(each)),
      };
    }

    return this.presentIfAbstractEntity(data);
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => this.present(data)));
  }
}
