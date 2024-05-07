import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TokenStore {
  @PrimaryColumn()
  userId: string;

  @Column('text', { array: true })
  tokens: string[];
}
