import { Entity, Unique, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "../models/user.entity";

@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @ManyToMany(() => User, user => user.userRoles)
    users: User[];


}