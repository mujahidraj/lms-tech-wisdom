import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class loginDto{
    @IsString()
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    @IsStrongPassword()
    password :string
}