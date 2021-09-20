import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertOperateurDto {

    @IsString()
    @IsNotEmpty()
    label: string;

    @IsNumber()
    @IsNotEmpty()
    nbreClients: number;

}