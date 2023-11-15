import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { AuthGuard } from '../../common/auth';
import { CustomRequest } from '../../common';
import { UpdateUserService } from '../../users/services/update-user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadUserProfilePictureService } from '../../users/services/upload-user-profile-picture.service';
import { UpdateUserPasswordService } from '../services/update-user-password.service';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

@Controller('me')
export class MeController {
  constructor(
    private readonly findUserByIdService: FindUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly updateUserPasswordService: UpdateUserPasswordService,
    private readonly uploadUserProfilePictureService: UploadUserProfilePictureService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async findMe(@Request() request: CustomRequest) {
    return this.findUserByIdService.execute(
      request.user.sub,
      request.correlationId,
    );
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateMe(
    @Req() request: CustomRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updateUserService.execute(
      request.user.sub,
      updateUserDto,
      request?.correlationId,
    );
  }

  @Patch('password')
  @UseGuards(AuthGuard)
  async updateMyPassword(
    @Req() request: CustomRequest,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    return this.updateUserPasswordService.execute(
      request.user.sub,
      updateUserDto,
      request?.correlationId,
    );
  }

  @Post('pictures')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadFile(
    @Req() request: CustomRequest,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return this.uploadUserProfilePictureService.execute(
      request.user.sub,
      file,
      request.correlationId,
    );
  }
}
