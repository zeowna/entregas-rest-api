interface PartnerPagingDtoConstructor {
  skip?: string;
  limit?: string;
  maxDistanceInMeters?: string;
  coordinates?: string;
}

export class FindPartnersByDistanceDto {
  skip: number;
  limit: number;
  maxDistanceInMeters: number;
  coordinates: Record<string, number>;

  constructor(props: PartnerPagingDtoConstructor) {
    this.skip = Number.parseInt(props?.skip);
    this.limit = Number.parseInt(props?.limit);
    this.maxDistanceInMeters = Number.parseInt(props?.maxDistanceInMeters);
    this.coordinates = props?.coordinates
      ? JSON.parse(props.coordinates)
      : null;
  }
}
