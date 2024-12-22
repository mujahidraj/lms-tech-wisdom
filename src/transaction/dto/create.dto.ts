import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createDto{
  

    
    student_id :number

    @IsNotEmpty()
    
    course_id  :number

    @IsNotEmpty()
    amount : number
    
    @IsNotEmpty()
    @IsString()
    status     :string

  
}