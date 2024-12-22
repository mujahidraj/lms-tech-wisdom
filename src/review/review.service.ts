import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createDto, editDto } from './dto';

@Injectable()
export class ReviewService {
     constructor(private databaseService: DatabaseService) { }
            
            
                //.............create review.......................
            
            
                async createreview(dto: createDto) {
            
            
                    const review = await this.databaseService.review.create({
                        data: {
                            student_id :dto.student_id,
                            course_id:dto.course_id,
                            rating : dto.rating,
                            comment :dto.comment
            
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
                            student_id :dto.student_id,
                            course_id:dto.course_id,
                            rating : dto.rating,
                            comment :dto.comment
            
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
}
