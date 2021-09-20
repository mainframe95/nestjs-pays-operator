import { IsEmail, IsString } from "class-validator";
import { Pays } from "src/pays/models/pays.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: null})
    email: string;

    @Column()
    password: string;

    @Column({ default: '' })
    salt: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Pays, pays => pays.createBy)
    paysCreated: Pays[];

    @OneToMany(() => Pays, pays => pays.createBy)
    operateurCreated: Pays[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

}