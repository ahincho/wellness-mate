import { PatientEntity } from '@patients/infrastructure/adapters/out/persistence/postgresql/entities/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'diagnoses' })
export class DiagnosisEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @JoinColumn({ name: 'patient_id' })
  @ManyToOne(() => PatientEntity, { onDelete: 'CASCADE' })
  patient: PatientEntity;
  @Column({ type: 'text' })
  description: string;
  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  constructor(partial?: Partial<DiagnosisEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
