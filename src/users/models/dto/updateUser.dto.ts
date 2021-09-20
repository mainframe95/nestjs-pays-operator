import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdatedUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

}