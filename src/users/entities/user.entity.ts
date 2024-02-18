import { IsEmail, MinLength } from "class-validator";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false})
    @MinLength(3)
    name: string;

    @Column({ length: 100, unique: true, nullable: false})
    @IsEmail()
    email: string;

    @Column({ length: 100, nullable: false})
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
