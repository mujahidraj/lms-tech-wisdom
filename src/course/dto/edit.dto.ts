import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class editDto{
  

    @IsString()
    @IsOptional()
    title     :  string

   
    @IsString()
    @IsOptional()
    description : string

    @IsOptional()
    @IsString()
    price   :   string

  
}