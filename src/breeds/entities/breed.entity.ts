import { MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Cat } from "src/cats/entities/cat.entity";

@Entity()
export class Breed {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ 
        unique: true,
        length: 50,
        nullable: false
    })
    @MinLength(3)
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany( () => Cat, cat => cat.breed)
    cats: Cat[];
}
