import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createDto{
  

    @IsString()
    @IsNotEmpty()
    title     :  string

   
    @IsString()
    @IsOptional()
    description : string

    @IsNotEmpty()
    @IsString()
    price   :   string

  
}