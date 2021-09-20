import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InsertUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}