import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {

    @IsString()
    @IsNotEmpty()
    @Length(6)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    password: string;

}