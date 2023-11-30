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
import { FindPartnersService } from '../services/find-partners.service';
import { PartnerPagingDto } from '../dto/find-partiners.dto';
import { CustomRequest, ID } from '../../common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindPartnerByIdService } from '../services/find-partner-by-id.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { CreatePartnerService } from '../services/create-partner.service';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { UpdatePartnerService } from '../services/update-partner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPartnerPictureService } from '../services/upload-partner-picture.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserTypes } from '../../users/entities/user-types.enum';
import { AuthGuard } from '../../common/auth';
import { RolesGuard } from '../../auth/guards/routes.guard';

@Controller('partners')
export class PartnersController {
  constructor(
    private readonly findPartnersService: FindPartnersService,
    private readonly findPartnerById: FindPartnerByIdService,
    private readonly createPartnerService: CreatePartnerService,
    private readonly updatePartnerService: UpdatePartnerService,
    private readonly uploadPartnerPictureService: UploadPartnerPictureService,
  ) {}

  @Roles([UserTypes.Customer])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/distance')
  findByDistance(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
  ) {
    const coordinates = {
      lat: Number.parseFloat(queryParams.lat),
      lng: Number.parseFloat(queryParams.lng),
    };
    const findPartnersDto = new PartnerPagingDto(queryParams);

    return this.findPartnersService.execute(
      findPartnersDto,
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner, UserTypes.Customer])
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  find(
    @Req() request: CustomRequest,
    @Query() queryParams: Record<string, string>,
  ) {
    const findPartnersDto = new PartnerPagingDto(queryParams);

    return this.findPartnersService.execute(
      findPartnersDto,
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner, UserTypes.Customer])
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findPartnerById.execute(+id, request?.correlationId, i18n);
  }

  @Roles([UserTypes.Admin])
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Req() request: CustomRequest,
    @Body() updateProductCategoryDto: CreatePartnerDto,
  ) {
    return this.createPartnerService.execute(
      updateProductCategoryDto,
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id([0-9]+)')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePartnerDto,
  ) {
    return this.updatePartnerService.execute(
      request.user.partnerId || +id,
      updateUserDto,
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Admin, UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id([0-9]+)/pictures')
  async uploadFile(
    @Req() request: CustomRequest,
    @Param('id') id: ID,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadPartnerPictureService.execute(
      request.user.partnerId || +id,
      file,
      request.correlationId,
    );
  }

  @Roles([UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id([0-9]+)/online')
  setOnline(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.updatePartnerService.execute(
      request.user.partnerId || +id,
      new UpdatePartnerDto({ isOnline: true }),
      request?.correlationId,
    );
  }

  @Roles([UserTypes.Partner])
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id([0-9]+)/offline')
  setOffline(@Req() request: CustomRequest, @Param('id') id: string) {
    return this.updatePartnerService.execute(
      request.user.partnerId || +id,
      new UpdatePartnerDto({ isOnline: false }),
      request?.correlationId,
    );
  }
}
