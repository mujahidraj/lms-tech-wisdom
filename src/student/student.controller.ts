import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { Getstudent } from 'src/login/decorator';
import { JwtGuard } from 'src/login/guard';
import { student } from '@prisma/client';
import { Request } from 'express';



@UseGuards(JwtGuard)
@Controller('student')
export class StudentController {
    constructor(private studentService : StudentService){}
    
    @Get('me')
    getme(@Getstudent()user : student ) {

        return user;
    }

   
}
