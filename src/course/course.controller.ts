import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { createDto } from './dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

  @Post('insert')
  create(@Body()dto:createDto ) {
    return this.courseService.createCourse(dto);
  }
}
