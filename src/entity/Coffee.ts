import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Recipe } from "./Recipe";
import { Region } from "./Region";
import { Roast } from "./Roast";
import { User } from "./User";

@Entity()
export class Coffee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  process: string;

  @ManyToOne(() => Roast, (roast) => roast.coffees)
  roast: Roast;

  @ManyToOne((_type) => Region, (region) => region.coffee)
  region: Region;

  @OneToMany((_t) => Recipe, (recipe) => recipe.coffee)
  recipes: Recipe[];

  @CreateDateColumn()
  createdDateTime: Date;

  @UpdateDateColumn()
  updatedDateTime: Date;

  @ManyToOne((_t) => User, (u) => u.coffees)
  createdBy: User;
}
