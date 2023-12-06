import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUsersResponse } from 'src/users/responses/find-users.response';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminUserResponse } from 'src/users/responses/admin.response';

@ApiTags('Admin Users')
@Controller('admin/users')
export class AdminUsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly findUserById: FindUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly uploadUserProfilePictureService: UploadUserProfilePictureService,
  ) {}

  @ApiBearerAuth()
  @ApiQuery({ type: () => UserPagingDto<AdminUser> })
  @ApiResponse({ type: () => FindUsersResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard)
  @Get()
  async find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
  ) {
    const userPagingDto = new UserPagingDto<AdminUser>(queryParams);
    userPagingDto.conditions.type = { eq: UserTypes.Admin };

    return this.findUsersService.execute(userPagingDto, request.correlationId);
  }

  @ApiResponse({ type: () => AdminUserResponse })
  @ApiBearerAuth()
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserById.execute(+id, request?.correlationId, i18n);
  }

  @ApiResponse({ type: () => AdminUserResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() createAdminUserDto: CreateAdminUserDto,
  ) {
    return this.createUserService.execute(
      createAdminUserDto,
      request?.correlationId,
    );
  }

  @ApiResponse({ type: () => AdminUserResponse })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard)
  @Patch(':id')
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

  @ApiResponse({ type: String })
  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id([0-9]+)/pictures')
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
