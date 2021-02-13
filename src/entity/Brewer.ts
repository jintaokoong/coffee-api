import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BrewMethod } from "./BrewMethod";
import { Manufacturer } from "./Manufacturer";
import { User } from "./User";

@Entity()
export class Brewer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Manufacturer, (m) => m.brewers)
  manufacturer: Manufacturer;

  @OneToMany((_t) => BrewMethod, (bm) => bm.brewer)
  brewMethods: BrewMethod[];

  @ManyToOne(() => User, (u) => u.brewers)
  createdBy: User;
}
