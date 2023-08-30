import { Entity, Column } from 'typeorm';
import { BaseEntity } from '~/server/entity/BaseEntity';
import type { IMonitoredResource } from '~/server/types/IMonitoredResource';

@Entity()
export class MonitoredResourceEntity extends BaseEntity implements IMonitoredResource {
  @Column({ unique: true })
  url!: string;

  @Column({ default: 60 })
  interval!: number;

  @Column({ default: false })
  isFavourite!: boolean;
}
