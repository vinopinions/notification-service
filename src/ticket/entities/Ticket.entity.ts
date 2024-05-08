import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import Token from '../../token/models/token';

@Entity()
class Ticket extends Token {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Ticket;
