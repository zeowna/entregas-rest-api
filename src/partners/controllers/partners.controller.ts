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
  UseInterceptors,
} from '@nestjs/common';
import { FindPartnersService } from '../services/find-partners.service';
import { FindPartnersDto } from '../dto/find-partiners.dto';
import { CustomRequest, ID } from '../../common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindPartnerByIdService } from '../services/find-partner-by-id.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { CreatePartnerService } from '../services/create-partner.service';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { UpdatePartnerService } from '../services/update-partner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPartnerPictureService } from '../services/upload-partner-picture.service';

@Controller('partners')
export class PartnersController {
  constructor(
    private readonly findPartnersService: FindPartnersService,
    private readonly findPartnerById: FindPartnerByIdService,
    private readonly createPartnerService: CreatePartnerService,
    private readonly updatePartnerService: UpdatePartnerService,
    private readonly uploadPartnerPictureService: UploadPartnerPictureService,
  ) {}

  @Get()
  find(
    @Req() request: CustomRequest,
    @Query() findPartnersDto: FindPartnersDto,
  ) {
    return this.findPartnersService.execute(
      findPartnersDto,
      request?.correlationId,
    );
  }

  @Get(':id([0-9]+)')
  async findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findPartnerById.execute(+id, request?.correlationId, i18n);
  }

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

  @Patch(':id([0-9]+)')
  async update(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePartnerDto,
  ) {
    return this.updatePartnerService.execute(
      +id,
      updateUserDto,
      request?.correlationId,
    );
  }

  @Post(':id([0-9]+)/pictures')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() request: CustomRequest,
    @Param('id') id: ID,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadPartnerPictureService.execute(
      +id,
      file,
      request.correlationId,
    );
  }
}
