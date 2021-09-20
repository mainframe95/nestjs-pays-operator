import { IsEmail, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

}