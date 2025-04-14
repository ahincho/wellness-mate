import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: false })
  firstname: string;
  @Column({ type: 'varchar', nullable: false })
  lastname: string;
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: false })
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_users_roles_user',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_users_roles_role',
    },
  })
  roles?: RoleEntity[];
  constructor(partial?: Partial<UserEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
