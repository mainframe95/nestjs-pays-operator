import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InsertPaysDto } from "./insertPays.dto";

export class UpdatedPaysDto extends InsertPaysDto {

    @IsNumber()
    @IsNotEmpty()
    id: string;

}