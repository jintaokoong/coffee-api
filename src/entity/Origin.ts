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
import { Coffee } from "./Coffee";
import { User } from "./User";

@Entity()
export class Origin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  region: string;

  @Column()
  country: string;

  @Column()
  farm: string;

  @Column()
  description: string;

  @OneToMany((_type) => Coffee, (coffee) => coffee.origin)
  coffee: Coffee[];

  @ManyToOne((_t) => User, (u) => u.regions)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
