import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'audit_log' })
export class AuditLog {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Index()
  @Column({ type: 'integer', nullable: true })
  public userId: number | null;

  @Column({ type: 'varchar', length: 10 })
  public method: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  public path: string;

  @Column({ type: 'integer' })
  public statusCode: number;

  @Column({ type: 'integer' })
  public durationMs: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;
}
