import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { createDto, editDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('enrollment')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access

export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}
    
      @Post('insert')
      create(@Body()dto:createDto ) {
        return this.enrollmentService.createEnrollment(dto);
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
      update(@Param('id') id: string, @Body() dto:editDto) {
        return this.enrollmentService.editEnrollment(+id, dto);
      }
    
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.enrollmentService.deleteEnrollment(+id);
      }
}
