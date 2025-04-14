import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PatientEntity } from './patient.entity';

@Entity({ name: 'histories' })
export class HistoryEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @JoinColumn({ name: 'patient_id' })
  @ManyToOne(() => PatientEntity, (patient) => patient.histories, {
    onDelete: 'CASCADE',
  })
  patient: PatientEntity;
  @Column()
  description: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<HistoryEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
