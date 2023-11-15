import { User } from '../entities/user.entity';
import { AbstractPagingDto } from '../../common';

export class UserPagingDto<T extends User> extends AbstractPagingDto<T> {}
