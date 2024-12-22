import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { createDto, editDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access

export class ReviewController {
    constructor(private review: ReviewService){}
              @Post('insert')
              create(@Body()dto:createDto ) {
                return this.review.createreview(dto);
              }
            
              @Get('all-review')
              findAll() {
                return this.review.getTransacion();
              }
            
              @Get(':id')
              findOne(@Param('id') id: string) {
                return this.review.getreviewById(+id);
              }
            
              @Patch(':id')
              update(@Param('id') id: string, @Body() dto:editDto) {
                return this.review.editreview(+id, dto);
              }
            
            
              @Delete(':id')
              remove(@Param('id') id: string) {
                return this.review.deletereview(+id);
              }
}
