import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertPaysDto {

    @IsString()
    @IsNotEmpty()
    label: string;

}