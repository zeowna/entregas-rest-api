import { AbstractTypeORMEntity } from '../entities';
import { QueryConditionsToNativeInterface } from '../inputs/query-conditions-to-native.interface';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { PlainQueryConditions, PlainQueryOperators } from '../inputs';
import {
  And,
  Equal,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

export class QueryTypeormConditions<T extends AbstractTypeORMEntity>
  implements QueryConditionsToNativeInterface<T, FindOptionsWhere<T>[]>
{
  constructor(readonly plainConditions: PlainQueryConditions<T>) {}

  private plainOperatorToNativeOperator<P>(
    plainOperator: keyof PlainQueryOperators<P>,
    value: P,
  ) {
    switch (plainOperator) {
      case 'eq':
        return Equal(value);
      case 'ne':
        return Not(value);
      case 'gt':
        return MoreThan(value);
      case 'lt':
        return LessThan(value);
      case 'gte':
        return MoreThanOrEqual(value);
      case 'lte':
        return LessThanOrEqual(value);
      case 'in':
        return In(value as P[]);
      case 'nin':
        return Not(In(value as P[]));
      default:
        throw new Error(`Invalid operator: ${plainOperator}`);
    }
  }

  private plainQueryParamToNativeQueryParam<P>(
    queryParam: string,
    plainQueryOperators: PlainQueryOperators<P>,
  ) {
    const nativeOperators = Object.keys(plainQueryOperators).reduce<
      FindOperator<P>[]
    >(
      (acc, plainOperator: keyof PlainQueryOperators<P>) => [
        ...acc,
        this.plainOperatorToNativeOperator(
          plainOperator,
          plainQueryOperators[plainOperator],
        ),
      ],
      [],
    );

    return { [queryParam]: And(...nativeOperators) };
  }

  private reduceQueryParams(plainConditions: PlainQueryConditions<T>) {
    return Object.keys(plainConditions).reduce<FindOptionsWhere<T>>(
      (acc, queryParam) => {
        if (queryParam === 'or') {
          return acc;
        }

        return {
          ...acc,
          ...this.plainQueryParamToNativeQueryParam(
            queryParam,
            plainConditions[queryParam],
          ),
        };
      },
      {},
    );
  }

  toCondition() {
    if (!this.plainConditions) {
      return null;
    }

    const or = (this.plainConditions.or ?? []).map((plainConditions) =>
      this.reduceQueryParams(plainConditions),
    );

    const typeormConditions = this.reduceQueryParams(this.plainConditions);

    if (!Object.values(typeormConditions).length && !or?.length) {
      return null;
    }

    return [typeormConditions, ...or];
  }
}
