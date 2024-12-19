import { Param } from "@nestjs/common"
import { IsEmail, IsInt, IsLocale, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPassportNumber, IsPhoneNumber, isString, IsString, IsStrongPassword, Matches } from "class-validator"

export class registrationDto {

    @IsNotEmpty()
    @IsString()
    first_name : string
   
    @IsNotEmpty()
    @IsString()
    last_name : string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email     : string

   
    @IsString()
    @IsNotEmpty()
    phone_number : string
    
    @IsNotEmpty()
    @IsString()
    username  : string
    
    @IsNotEmpty()
    @IsStrongPassword() 
    password     : string

    @IsNotEmpty()
    @IsString()
    address : string
   
    @IsOptional()
    @IsString()
    enrollment_status : string
}