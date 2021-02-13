import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoastedCoffee } from "./RoastedCoffee";

@Entity()
export class Roastery extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => RoastedCoffee, (rc) => rc.roastery)
  roasted: RoastedCoffee[];
}
