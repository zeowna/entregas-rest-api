import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { PartnerProduct } from './entities/partner-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, PartnerProduct])],
  exports: [TypeOrmModule],
})
export class PartnersModule {}
