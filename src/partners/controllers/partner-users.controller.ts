import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserService } from '../../users/services/create-user.service';
import {
  AbstractService,
  CustomRequest,
  ID,
  NestLoggerService,
} from '../../common';
import { CreatePartnerUserDto } from '../dto/create-partner-user.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FindUserByIdService } from '../../users/services/find-user-by-id.service';
import { PartnerUser } from '../../users/entities/partner-user.entity';
import { PartnerUsersTypeORMRepository } from '../repositores/partner-users-typeorm.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class FindPartnerUserByPartnerId extends AbstractService<PartnerUser> {
  constructor(
    private readonly usersRepository: PartnerUsersTypeORMRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(logger);
  }

  async execute(partnerId: ID, correlationId: string, i18n: I18nContext) {
    try {
      this.logBefore({
        partnerId,
        correlationId,
      });

      const found = await this.usersRepository.findByPartnerId(partnerId);

      if (!found) {
        throw new NotFoundException(
          i18n.translate('validation.entity.notFound', {
            args: {
              entityName: i18n.translate(
                `entity.${this.usersRepository.entityName}.entityName`,
              ),
              param: i18n.translate(`partnerId`),
              value: partnerId,
            },
          }),
        );
      }

      this.logAfter({
        success: true,
        correlationId,
        found,
      });

      return found;
    } catch (err) {
      this.logAfter({ success: false, correlationId, err });
      throw err;
    }
  }
}

@Injectable()
export class CreatePartnerUserService extends CreateUserService {
  protected async beforeCreate(createUserDto: CreatePartnerUserDto) {
    const newPassword = randomUUID();

    createUserDto.password = newPassword;

    console.log({ newPassword });

    return super.beforeCreate(createUserDto);
  }
}

@Controller('partners')
export class PartnerUsersController {
  constructor(
    private readonly findPartnerUserByPartnerId: FindPartnerUserByPartnerId,
    private readonly findUserById: FindUserByIdService,
    private readonly createPartnerUser: CreateUserService,
  ) {}

  @Get(':partnerId([0-9]+)/users')
  private findByPartnerId(
    @Req() request: CustomRequest,
    @Param('partnerId') partnerId: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findPartnerUserByPartnerId.execute(
      +partnerId,
      request?.correlationId,
      i18n,
    );
  }

  @Get(':partnerId([0-9]+)/users/:id([0-9]+)')
  private findById(
    @Req() request: CustomRequest,
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
  ) {
    return this.findUserById.execute(+id, request?.correlationId, i18n);
  }

  @Post(':partnerId([0-9]+)/users')
  private create(
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
}
