import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class editDto{
  

        @IsOptional()
        
        reply_by: number
        

        @IsOptional()
        comment_by : number
    
        @IsOptional()
    
        course_id: number
    
        @IsOptional()
        rating: number
    
        @IsOptional()
        @IsString()
        comment: string
    
        @IsOptional()
        @IsString()
        reply : string

  
}