import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { Address } from '../entities/address.entity';
import { AbstractService, NestLoggerService } from '../../common';

@Injectable()
export class GeocodingService extends AbstractService<any> {
  private readonly client: Client;

  constructor(private readonly logger: NestLoggerService) {
    super(logger);
    this.client = new Client({
      config: {},
    });
  }

  async execute(address: Address, correlationId: string) {
    this.logBefore({
      address,
      correlationId,
    });

    try {
      const response = await this.client.geocode({
        params: {
          address: `${address.cep}, ${address.number}, ${address.street}, ${address.city}, ${address.neighbourhood}`,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      const coordinates = response.data.results.length
        ? {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
          }
        : null;

      this.logAfter({
        address,
        response: response.data,
        coordinates,
        correlationId,
        success: true,
      });

      return coordinates;
    } catch (err) {
      this.logAfter({
        address,
        err,
        correlationId,
        success: false,
      });

      throw err;
    }
  }
}
