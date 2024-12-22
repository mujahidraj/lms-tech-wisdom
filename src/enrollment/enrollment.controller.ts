import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { createDto, editDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('enrollment')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access

export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}
    
      @Post('insert')
      create(@Body()dto:createDto ,@Req() req: Request, @Req() req2: Request) {
        const userId = req.user['enrollment_status'];
        const student_id= req2.user['id'];
        return this.enrollmentService.createEnrollment(dto,userId,student_id);
      }
    
      @Get('all-enrollment')
      findAll() {
        return this.enrollmentService.getEnrollment();
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.enrollmentService.getEnrollmentById(+id);
      }
    
      @Patch(':id')
      update(@Param('id') id: string, @Body() dto:editDto,@Req() req: Request) {
        const userId = req.user['enrollment_status'];
        return this.enrollmentService.editEnrollment(+id, dto,userId);
      }
    
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.enrollmentService.deleteEnrollment(+id);
      }
}
