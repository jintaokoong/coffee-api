import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Coffee } from "./Coffee";
import { Recipe } from "./Recipe";
import { Roast } from "./Roast";
import { Roastery } from "./Roastery";
import { User } from "./User";

@Entity()
export class RoastedCoffee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  weight: number;

  @ManyToOne(() => Roastery, (r) => r.roasted)
  roastery: Roastery;

  @ManyToOne(() => Roast, (roast) => roast.coffees)
  roast: Roast;

  @OneToMany((_t) => Recipe, (recipe) => recipe.roasted)
  recipes: Recipe[];

  @OneToOne(() => Coffee, (c) => c.roasted)
  coffee: Coffee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_t) => User, (u) => u.roasteds)
  createdBy: User;
}
