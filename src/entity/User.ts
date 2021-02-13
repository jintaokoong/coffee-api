import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brewer } from "./Brewer";
import { BrewMethod } from "./BrewMethod";
import { Coffee } from "./Coffee";
import { Origin } from "./Origin";
import { Recipe } from "./Recipe";
import { RoastedCoffee } from "./RoastedCoffee";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Origin, (r) => r.createdBy)
  regions: Origin[];

  @OneToMany(() => Coffee, (r) => r.createdBy)
  coffees: Coffee[];

  @OneToMany(() => RoastedCoffee, (r) => r.createdBy)
  roasteds: RoastedCoffee[];

  @OneToMany(() => Recipe, (r) => r.createdBy)
  recipes: Recipe[];

  @OneToMany(() => Brewer, (r) => r.createdBy)
  brewers: Brewer[];

  @OneToMany(() => BrewMethod, (bm) => bm.createdBy)
  brewMethods: BrewMethod[];
}
