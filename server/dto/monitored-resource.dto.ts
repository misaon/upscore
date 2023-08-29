import { IsNotEmpty, IsUrl, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class MonitoredResourcePostDto {
  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsNumber()
  interval!: number;

  @IsOptional()
  @IsBoolean()
  isFavourite!: boolean;
}
