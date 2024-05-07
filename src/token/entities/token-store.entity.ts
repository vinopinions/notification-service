import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TokenStore {
  @PrimaryColumn()
  @IsUUID()
  userId: string;

  @Column('text', { array: true })
  tokens: string[];
}
