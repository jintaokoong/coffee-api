import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brewer } from "./Brewer";
import { User } from "./User";

@Entity()
export class BrewMethod extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  procedures: string;

  @ManyToOne((_t) => Brewer, (b) => b.brewMethods)
  brewer: Brewer;

  @ManyToOne(() => User, (u) => u.brewMethods)
  createdBy: User;
}
