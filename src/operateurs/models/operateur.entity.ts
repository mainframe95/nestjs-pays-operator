import { Pays } from "src/pays/models/pays.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

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

    @ManyToMany(() => Pays)
    @JoinTable()
    pays: Pays[];

}