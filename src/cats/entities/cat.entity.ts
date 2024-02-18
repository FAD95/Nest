import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

import { Breed } from "src/breeds/entities/breed.entity";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne( () => Breed, ( breed ) => breed.id,
    {
        eager: true
    })
    breed: Breed;
}
