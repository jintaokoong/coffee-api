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
import { RoastedCoffee } from "./RoastedCoffee";
import { User } from "./User";

@Entity()
export class Roastery extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @OneToMany(() => RoastedCoffee, (rc) => rc.roastery)
  roasted: RoastedCoffee[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.roasteries)
  createdBy: User;
}
