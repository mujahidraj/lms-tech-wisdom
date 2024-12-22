import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { createDto, editDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('review')
@UseGuards(AuthGuard('jwt')) // Ensure only authenticated users can access

export class ReviewController {
    constructor(private review: ReviewService){}
              @Post('insert')
              create(@Body()dto:createDto ,@Req() req: Request ) {
                const userId = req.user['id'];
                return this.review.createreview(dto,userId);
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




              //..................add comment...............

              @Post('comment')
              async addComment(
                @Body('course_id') course_id: number,
                @Body('reply') reply: string,
                @Req() req: Request,
              ) {
                const userId = req.user['id']; // Extract user ID from JWT token
                return this.review.addComment(userId, course_id, reply);
              }
}
