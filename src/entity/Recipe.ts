import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BrewMethod } from './BrewMethod';
import { RoastedCoffee } from './RoastedCoffee';
import { TasteNote } from './TasteNote';
import { User } from './User';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  duration: number;

  @Column()
  weight: number;

  @Column()
  volume: number;

  @Column()
  remarks: string;

  @Column()
  grind: string;

  @ManyToMany(() => TasteNote, (tn) => tn.recipes)
  tasteNotes: TasteNote[];

  @ManyToOne((_t) => RoastedCoffee, (coffee) => coffee.recipes)
  roastedCoffees: RoastedCoffee;

  @ManyToOne(() => BrewMethod, (bm) => bm.recipes)
  brewMethod: BrewMethod;

  @ManyToOne((_t) => User, (u) => u.recipes)
  createdBy: User;
}
