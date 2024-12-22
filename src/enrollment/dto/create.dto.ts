import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createDto{
  
    
    
    student_id :number

    @IsNotEmpty()
    
    course_id  :number
    
    @IsBoolean()
    @IsOptional()
    status     :string

  
}