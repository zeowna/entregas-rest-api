import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CustomRequest } from '../../common';
import { FindUsersService } from '../../users/services/find-users.service';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { CreateUserService } from '../../users/services/create-user.service';
import { UpdateUserService } from '../../users/services/update-user.service';
import { UserPagingDto } from '../../users/dto/user-paging.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateCustomerUserDto } from '../dto/create-customer-user.dto';
import { UpdateCustomerUserDto } from '../dto/update-customer-user.dto';
import { CustomerUser } from '../../users/entities/customer-user.entity';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly findUserById: FindUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  async find(
    @Req() request: CustomRequest,
    @Query() userPagingDto: UserPagingDto<CustomerUser>,
  ) {
    return this.findUsersService.execute(userPagingDto, request.correlationId);
  }

  @Get(':id')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserById.execute(+id, request?.correlationId);
  }

  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() createCustomerDto: CreateCustomerUserDto,
  ) {
    return this.createUserService.execute(
      createCustomerDto,
      request?.correlationId,
    );
  }

  @Patch(':id')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCustomerUserDto,
  ) {
    return this.updateUserService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }
}
