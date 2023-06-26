import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  private create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  private findAll(@Query('skip') skip = 0, @Query('limit') limit = 10) {
    return this.usersService.findAll(+skip, +limit);
  }

  @Get(':id')
  private findById(@Param('id') id: string, @I18n() i18n: I18nContext) {
    this.usersService.setI18n(i18n);
    return this.usersService.findById(+id);
  }

  @Delete(':id')
  private remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id')
  private update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }
}
