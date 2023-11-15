import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindUsersService } from '../../users/services/find-users.service';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { CreateUserService } from '../../users/services/create-user.service';
import { UpdateUserService } from '../../users/services/update-user.service';
import { CustomRequest, ID } from '../../common';
import { UserPagingDto } from '../../users/dto/user-paging.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateAdminUserDto } from '../dto/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadUserProfilePictureService } from '../../users/services/upload-user-profile-picture.service';
import { AdminUser } from '../../users/entities/admin-user.entity';

@Controller('admin/users')
export class AdminUsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly findUserById: FindUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly uploadUserProfilePictureService: UploadUserProfilePictureService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async find(@Req() request: CustomRequest) {
    const userPagingDto = new UserPagingDto<AdminUser>(request.query);
    userPagingDto.conditions.type = { eq: UserTypes.Admin };

    return this.findUsersService.execute(userPagingDto, request.correlationId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserById.execute(+id, request?.correlationId, i18n);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() request: CustomRequest,
    @Body() createAdminUserDto: CreateAdminUserDto,
  ) {
    return this.createUserService.execute(
      createAdminUserDto,
      request?.correlationId,
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.updateUserService.execute(
      +id,
      updateAdminUserDto,
      request?.correlationId,
    );
  }

  @Post(':id([0-9]+)/pictures')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadFile(
    @Req() request: CustomRequest,
    @Param('id') id: ID,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadUserProfilePictureService.execute(
      +id,
      file,
      request.correlationId,
    );
  }
}
