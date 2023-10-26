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
import { FindUserByIdService } from '../services/find-user-by-id.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindUsersService } from '../services/find-users.service';
import { UserPagingDto } from '../dto/user-paging.dto';
import { UpdateUserService } from '../services/update-user.service';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CreateUserService } from '../services/create-user.service';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto';

@Controller('admins')
export class AdminUsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly findUserById: FindUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Get()
  private find(
    @Req() request: CustomRequest,
    @Query() userPagingDto: UserPagingDto,
  ) {
    return this.findUsersService.execute(userPagingDto, request.correlationId);
  }

  @Get(':id')
  private findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserById.execute(+id, request?.correlationId);
  }

  @Post()
  private create(
    @Req() request: CustomRequest,
    @Body() createAdminUserDto: CreateAdminUserDto,
  ) {
    return this.createUserService.execute(
      createAdminUserDto,
      request?.correlationId,
    );
  }

  @Patch(':id')
  private update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCustomerDto,
  ) {
    return this.updateUserService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }
}
