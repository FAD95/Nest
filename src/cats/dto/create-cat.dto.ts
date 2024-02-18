import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    breed?: string;
}
