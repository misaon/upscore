import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export interface IMonitoredResource {
  id: number;
  uuid: string;
  url: string;
  interval: number;
  isFavourite: boolean;
  createDate: Date;
  updateDate: Date;
}

@Entity()
export class MonitoredResource implements IMonitoredResource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column('uuid')
  uuid!: string;

  @Column({ unique: true })
  url!: string;

  @Column({ default: 60 })
  interval!: number;

  @Column({ default: false })
  isFavourite!: boolean;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;

  constructor() {
    this.uuid = uuidV4();
  }
}
