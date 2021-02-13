import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brewer } from "./Brewer";
import { Recipe } from "./Recipe";
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

  @OneToMany(() => Recipe, (r) => r.brewMethod)
  recipes: Recipe[];

  @ManyToOne(() => User, (u) => u.brewMethods)
  createdBy: User;
}
