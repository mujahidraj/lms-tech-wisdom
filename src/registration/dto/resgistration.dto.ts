import { Param } from "@nestjs/common"
import { IsEmail, IsLocale, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPassportNumber, IsPhoneNumber, isString, IsString } from "class-validator"

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

    @IsNotEmpty()
    @IsNumber()
    phone_number : number
    
    @IsNotEmpty()
    @IsString()
    username  : string
    
    @IsNotEmpty()
    @IsNumber() 
    password     : string

    @IsNotEmpty()
    @IsString()
    address : string
   
    @IsOptional()
    @IsString()
    enrollment_status : string
}