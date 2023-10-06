import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ enum: [0, 1] })
  role: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
