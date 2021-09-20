import { Operateur } from "src/operateurs/models/operateur.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Timestamp, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['label'])
export class Pays {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column({ default: 0 })
    nbreOperateur: number;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(() => Operateur, operateur => operateur.pays)
    operateurs: Operateur[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @BeforeUpdate()
    beforeUpdate() {
        console.log('update', this)
    }

}