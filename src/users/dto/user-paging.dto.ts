import { User } from '../entities/user.entity';
import { AbstractPagingDto } from '../../common';

export class UserPagingDto extends AbstractPagingDto<User> {}
