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
import { CustomRequest, ID } from '../../common';
import { CreatePartnerUserDto } from '../dto/create-partner-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { FindUsersService } from '../../users/services/find-users.service';
import { UserPagingDto } from '../../users/dto/user-paging.dto';
import { CreatePartnerUserService } from '../services/create-partner-user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadUserProfilePictureService } from '../../users/services/upload-user-profile-picture.service';
import { UpdateUserService } from '../../users/services/update-user.service';
import { UpdatePartnerUserDto } from '../dto/update-partner-user.dto';
import { AuthGuard } from '../../common/auth';
import { PartnerUser } from '../../users/entities/partner-user.entity';

@Controller('partners')
export class PartnerUsersController {
  constructor(
    private readonly findUsersService: FindUsersService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly createPartnerUser: CreatePartnerUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly uploadUserProfilePictureService: UploadUserProfilePictureService,
  ) {}

  @Get(':partnerId([0-9]+)/users')
  @UseGuards(AuthGuard)
  private findByPartnerId(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Query() queryParams: Record<string, string>,
  ) {
    const userPagingDto = new UserPagingDto<PartnerUser>(queryParams);
    userPagingDto.conditions.partner = {
      eq: +partnerId,
    };

    return this.findUsersService.execute(userPagingDto, request.correlationId);
  }

  @Get(':partnerId([0-9]+)/users/:id([0-9]+)')
  @UseGuards(AuthGuard)
  private findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserByIdService.execute(+id, request?.correlationId, i18n);
  }

  @Post(':partnerId([0-9]+)/users')
  async create(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @Body() createPartnerUserDto: CreatePartnerUserDto,
  ) {
    createPartnerUserDto.partnerId = +partnerId;

    return this.createPartnerUser.execute(
      createPartnerUserDto,
      request?.correlationId,
    );
  }

  @Patch(':partnerId([0-9]+)/users/:id([0-9]+)')
  @UseGuards(AuthGuard)
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePartnerUserDto,
  ) {
    return this.updateUserService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }

  @Post(':partnerId([0-9]+)/users/:id([0-9]+)/pictures')
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
