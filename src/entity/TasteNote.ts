import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class TasteNote extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @ManyToMany(() => Recipe, (r) => r.tasteNotes)
  recipes: Recipe[];
}
