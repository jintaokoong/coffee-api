import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coffee } from "./Coffee";

@Entity()
export class Process extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Coffee, (c) => c.process)
  coffees: Coffee[];
}
