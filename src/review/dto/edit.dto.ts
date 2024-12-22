import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class editDto{
  

       @IsOptional()
        @IsNumber()
        student_id :number
    
        @IsOptional()
        @IsNumber()
        course_id  :number

        @IsOptional()
        
        rating : number
        
        @IsOptional()
        @IsString()
        comment    :string

  
}