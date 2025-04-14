import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryEntity } from './history.entity';

@Entity({ name: 'patients' })
export class PatientEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
  @Column({ name: 'firstname' })
  firstname: string;
  @Column({ name: 'lastname' })
  lastname: string;
  @Column({ name: 'email', unique: true })
  email: string;
  @Column({ type: 'date' })
  birthday: Date;
  @OneToMany(() => HistoryEntity, (history) => history.patient, {
    cascade: true,
  })
  histories?: HistoryEntity[];
  constructor(partial?: Partial<PatientEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
