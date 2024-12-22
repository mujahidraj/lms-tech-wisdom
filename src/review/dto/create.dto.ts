import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class createDto {

    @IsNotEmpty()

    student_id: number

    @IsNotEmpty()

    course_id: number

    @IsNotEmpty()
    rating: number

    @IsNotEmpty()
    @IsString()
    comment: string


}