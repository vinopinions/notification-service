import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TokenInfo {
  @PrimaryColumn()
  token: string;

  @Column()
  userId: string;
}
