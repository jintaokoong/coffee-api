import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coffee } from "./Coffee";
import { TasteNote } from "./TasteNote";
import { User } from "./User";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rating: number;

  @Column()
  duration: number;

  @ManyToMany(() => TasteNote, (tn) => tn.recipes)
  tasteNotes: TasteNote[];

  @Column()
  remarks: string;

  @Column()
  grind: string;

  @ManyToOne((_t) => Coffee, (coffee) => coffee.recipes)
  coffee: Coffee;

  @ManyToOne((_t) => User, (u) => u.recipes)
  createdBy: User;
}
