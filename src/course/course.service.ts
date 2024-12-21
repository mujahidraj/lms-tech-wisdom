import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { createDto, editDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CourseService {
    constructor(private databaseService: DatabaseService) { }


    //.............create course .......................


    async createCourse(dto: createDto) {


        const course = await this.databaseService.course.create({
            data: {
                title: dto.title,
                description: dto.description,
                price: dto.price

            },
        });

        return 'Insertion success';

    }




    //..........................get course......................

    async getCourses() {
        return this.databaseService.course.findMany();
      }



      //..........................Get course by id.....................................
    

      async getCourseById(id: number) {
        return this.databaseService.course.findUnique({ where: { id } });
      }



      //....................update course by id.............................

      async editcourse(userId : number ,dto: editDto) {


        const course = await this.databaseService.course.update({
            where :{
                id : userId, 
            },
            data: {
                title: dto.title,
                description: dto.description,
                price: dto.price

            },
        });

        return 'Data Update success';

    }




    //................................delete course by id..................................

    async deleteCourse(id: number) {
        return this.databaseService.course.delete({
         
             where:
              { 
                id,
                
             } 
             
            });
           
      }

}
