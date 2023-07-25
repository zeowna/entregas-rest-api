import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { AuthGuard } from './auth.guard';
import { NestJwtService } from './nest-jwt.service';

@Module({})
export class ZeownaAuthModule {
  static register(options: JwtModuleOptions): DynamicModule {
    return {
      module: ZeownaAuthModule,
      imports: [JwtModule.register(options)],
      providers: [AuthGuard, NestJwtService],
      exports: [AuthGuard, NestJwtService],
    };
  }
}
