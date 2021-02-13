import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoastedCoffee } from "./RoastedCoffee";

@Entity()
export class Roast extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => RoastedCoffee, (coffee) => coffee.roast)
  coffees: RoastedCoffee[];
}
