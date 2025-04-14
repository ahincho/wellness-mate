import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true })
  name: string;
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[];
  constructor(partial?: Partial<RoleEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
