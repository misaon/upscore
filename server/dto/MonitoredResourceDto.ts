import {
  IsNotEmpty,
  IsUrl,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsOptional,
  Matches,
  Min,
  Max,
} from 'class-validator';
import type { IMonitoredResource } from '~/server/types/IMonitoredResource';

export class MonitoredResourceDto implements IMonitoredResource {
  id!: number;
  uuid!: string;
  url!: string;
  interval!: number;
  isFavourite!: boolean;
  createDate!: Date;
  updateDate!: Date;
}

export class MonitoredResourceGetDto implements Pick<IMonitoredResource, 'uuid'> {
  @IsNotEmpty()
  @IsUUID()
  uuid!: string;
}

export class MonitoredResourcePostDto
  implements Pick<IMonitoredResource, 'url' | 'interval' | 'isFavourite'>
{
  @IsNotEmpty()
  @IsUrl()
  @Matches(/^https?:\/\//)
  url!: string;

  @IsOptional()
  @IsNumber()
  @Min(5)
  @Max(3600)
  interval?: number;

  @IsOptional()
  @IsBoolean()
  isFavourite?: boolean;
}

export class MonitoredResourceDeleteDto extends MonitoredResourceGetDto {}
