import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createDto {

    @IsString()
    @IsOptional()
    reply_by: number

    @IsOptional()
    comment_by : number

    @IsNotEmpty()

    course_id: number

    @IsNotEmpty()
    rating: number

    @IsNotEmpty()
    @IsString()
    comment: string

    @IsOptional()
    @IsString()
    reply : string


}