import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Origin } from "./Origin";
import { Process } from "./Process";
import { RoastedCoffee } from "./RoastedCoffee";
import { User } from "./User";

@Entity()
export class Coffee extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  variation: string;

  @ManyToOne(() => Process, (p) => p.coffees)
  process: Process;

  @OneToOne(() => RoastedCoffee, (rc) => rc.coffee)
  roasted: RoastedCoffee;

  @ManyToOne((_type) => Origin, (origin) => origin.coffee)
  origin: Origin;

  @CreateDateColumn()
  createdDateTime: Date;

  @UpdateDateColumn()
  updatedDateTime: Date;

  @ManyToOne((_t) => User, (u) => u.coffees)
  createdBy: User;
}
