import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coffee } from './Coffee';
import { Recipe } from './Recipe';
import { Roast } from './Roast';
import { Roastery } from './Roastery';
import { User } from './User';

@Entity()
export class RoastedCoffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  weight: number;

  @ManyToOne(() => Roastery, (r) => r.roastedCoffees)
  roastery: Roastery;

  @ManyToOne(() => Roast, (roast) => roast.coffees)
  roast: Roast;

  @OneToMany((_t) => Recipe, (recipe) => recipe.roastedCoffees)
  recipes: Recipe[];

  @ManyToOne(() => Coffee, (c) => c.roastedCoffees)
  coffee: Coffee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((_t) => User, (u) => u.roasteds)
  createdBy: User;
}
