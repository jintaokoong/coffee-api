import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coffee } from "./Coffee";
import { User } from "./User";

@Entity()
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @OneToMany((_type) => Coffee, (coffee) => coffee.region)
  coffee: Coffee[];

  @ManyToOne((_t) => User, (u) => u.regions)
  createdBy: User;
}
