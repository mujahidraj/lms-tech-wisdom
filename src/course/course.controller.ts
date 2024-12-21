import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { createDto, editDto } from './dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

  @Post('insert')
  create(@Body()dto:createDto ) {
    return this.courseService.createCourse(dto);
  }

  @Get('all-course')
  findAll() {
    return this.courseService.getCourses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.getCourseById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto:editDto) {
    return this.courseService.editcourse(+id, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.deleteCourse(+id);
  }
}
