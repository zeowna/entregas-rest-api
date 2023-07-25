import { Body, Controller, Post, Req } from '@nestjs/common';
import { SignInService } from './services/sign-in.service';
import { SignInDto } from './dto/sign-in.dto';
import { CustomRequest } from '../common';

@Controller('auth')
export class AuthController {
  constructor(private signInService: SignInService) {}

  @Post()
  signIn(@Req() request: CustomRequest, @Body() signInDto: SignInDto) {
    return this.signInService.execute(signInDto, request.correlationId);
  }
}
