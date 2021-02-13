import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brewer } from "./Brewer";

@Entity()
export class Manufacturer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => Brewer, (b) => b.manufacturer)
  brewers: Brewer[];

  @CreateDateColumn()
  createdAt: Date;
}
