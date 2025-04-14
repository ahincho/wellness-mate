import { ModuleEnum } from '@common/enums/module.enum';
import { Layer } from '@shared/logging/domain/enums/layer.enum';
import { Level } from '@shared/logging/domain/enums/level.enum';
import { v7 as uuid } from 'uuid';
import {
  Entity,
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'logs' })
export class LogEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Index()
  @Column({ type: 'enum', enum: ModuleEnum })
  module: ModuleEnum;
  @Index()
  @Column({ type: 'enum', enum: Layer })
  layer: Layer;
  @Index()
  @Column({ type: 'enum', enum: Level })
  level: Level;
  @CreateDateColumn({ name: 'timestamp' })
  timestamp: Date;
  @Column({ type: 'text' })
  message: string;
  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }
  constructor(partial?: Partial<LogEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
