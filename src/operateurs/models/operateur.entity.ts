import { Pays } from "src/pays/models/pays.entity";
import { User } from "src/users/models/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['label'])
export class Operateur {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column({ default: 0 })
    nbreClients: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @ManyToMany(() => Pays, pays => pays.operateurs)
    @JoinTable()
    pays: Pays[];

    @ManyToOne(() => User, user => user.operateurCreated)
    createBy: User;

}