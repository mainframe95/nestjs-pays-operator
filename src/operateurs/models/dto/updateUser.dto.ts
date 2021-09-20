import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InsertOperateurDto } from "./insertUser.dto";

export class UpdatedOperateurDto extends InsertOperateurDto {

    @IsNumber()
    @IsNotEmpty()
    id: string;

}