import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class editDto{
  

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