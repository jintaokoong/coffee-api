import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coffee } from "./Coffee";

@Entity()
export class Roast extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Coffee, (coffee) => coffee.roast)
  coffees: Coffee[];
}
