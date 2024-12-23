import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createDto, editDto } from './dto';

@Injectable()
export class ReviewService {
     constructor(private databaseService: DatabaseService) { }
            
            
                //.............create review.......................
            
            
                async createreview(dto: createDto ,commented_by:number) {
            
            
                    const review = await this.databaseService.review.create({
                        data: {
                            
                            comment_by : commented_by,
                            course_id:dto.course_id,
                            rating : dto.rating,
                            comment :dto.comment,
                          
            
                        },
                    });
            
                    return 'Insertion success';
            
                }
            
            
            
            
                //..........................get review......................
            
                async getTransacion() {
                    return this.databaseService.review.findMany();
                  }
            
            
            
                  //..........................Get review by id.....................................
                
            
                  async getreviewById(id: number) {
                    return this.databaseService.review.findUnique({ where: { id } });
                  }
            
            
            
                  //....................update review by id.............................
            
                  async editreview(userId : number ,dto: editDto) {
            
            
                    const review = await this.databaseService.review.update({
                        where :{
                            id : userId, 
                        },
                        data: {
                            reply_by :dto.reply_by,
                            comment_by : dto.comment_by,
                            course_id:dto.course_id,
                            rating : dto.rating,
                            comment :dto.comment,
                            reply :dto.reply
            
                        },
                    });
            
                    return 'Data Update success';
            
                }
            
            
            
            
                //................................delete review by id..................................
            
                async deletereview(id: number) {
                    return this.databaseService.review.delete({
                     
                         where:
                          { 
                            id,
                            
                         } 
                         
                        });
                       
                  }




                  //................. addingf comment............

                  async addComment(reply_by: number, course_id: number, reply: string) {
                   
                    const course = await this.databaseService.course.findMany({ where: { id: course_id } });
                    if (!course) {
                      throw new Error('Course not found');
                    }
                
                   
                    return this.databaseService.review.update({
                        where :
                        {
                            course_id:course_id
                        },
                      data: {
                        reply_by,
                        course_id,
                        reply,
                        
                        
                      },
                    });
                  }
}
