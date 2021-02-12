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
import { Recipe } from "./Recipe";
import { Region } from "./Region";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Region, (r) => r.createdBy)
  regions: Region[];

  @OneToMany(() => Coffee, (r) => r.createdBy)
  coffees: Coffee[];

  @OneToMany(() => Recipe, (r) => r.createdBy)
  recipes: Recipe[];

  @OneToMany(() => Brewer, (r) => r.createdBy)
  brewers: Brewer[];

  @OneToMany(() => BrewMethod, (bm) => bm.createdBy)
  brewMethods: BrewMethod[];
}
