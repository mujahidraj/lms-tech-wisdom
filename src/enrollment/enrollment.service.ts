import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { createDto, editDto } from './dto';

@Injectable()
export class EnrollmentService {
    constructor(private databaseService: DatabaseService) { }


    //.............create Enrollment .......................


    async createEnrollment(dto: createDto,enrollment_status:boolean,student_id:number) {


        const enrollment = await this.databaseService.enrollment.create({
            data: {
                student_id: student_id,
                course_id: dto.course_id,
                status: enrollment_status,
                

            },
        });

        return 'Insertion success';

    }




    //..........................get Enrollment......................

    async getEnrollment() {
        return this.databaseService.enrollment.findMany();
    }



    //..........................Get Enrollment by id.....................................


    async getEnrollmentById(id: number) {
        return this.databaseService.enrollment.findUnique({ where: { id } });
    }



    //....................update enrollment by id.............................

    async editEnrollment(userId: number, dto: editDto,enrollment_status:boolean) {


        const enrollment = await this.databaseService.enrollment.update({
            where: {
                id: userId,
            },
            data: {
                student_id: dto.student_id,
                course_id: dto.course_id,
                status: enrollment_status

            },
        });

        return 'Data Update success';

    }




    //................................delete enrollment by id..................................

    async deleteEnrollment(id: number) {
        return this.databaseService.enrollment.delete({

            where:
            {
                id,

            }

        });

    }

}
