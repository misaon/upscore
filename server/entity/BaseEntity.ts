import {
  PrimaryGeneratedColumn,
  Index,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity as TypeORMBaseEntity,
} from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column('uuid', {
    default: () =>
      `(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))`,
  })
  uuid!: string;

  @CreateDateColumn()
  createDate!: Date;

  @UpdateDateColumn()
  updateDate!: Date;
}
