import { Body, Controller, Post, Req } from '@nestjs/common';
import { SignInService } from './services/sign-in.service';
import { SignInDto } from './dto/sign-in.dto';
import { CustomRequest } from '../common';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private signInService: SignInService,
    private forgotPasswordService: ForgotPasswordService,
  ) {}

  @Post()
  signIn(@Req() request: CustomRequest, @Body() signInDto: SignInDto) {
    return this.signInService.execute(signInDto, request.correlationId);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Req() request: CustomRequest,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.forgotPasswordService.execute(
      forgotPasswordDto,
      request.correlationId,
    );
  }
}
