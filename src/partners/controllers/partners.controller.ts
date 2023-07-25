import { Controller, Get, Query, Req } from '@nestjs/common';
import { FindPartnersService } from '../services/find-partners.service';
import { FindPartnersDto } from '../dto/find-partiners.dto';
import { CustomRequest } from '../../common';

@Controller('partners')
export class PartnersController {
  constructor(private readonly findPartnersService: FindPartnersService) {}

  //
  // @Post()
  // create(@Body() createPartnerDto: CreatePartnerDto) {
  //   return this.partnersService.create(createPartnerDto);
  // }
  //
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

  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.partnersService.findById(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
  //   return this.partnersService.update(+id, updatePartnerDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.partnersService.remove(+id);
  // }
}
