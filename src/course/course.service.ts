import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { createDto } from './dto';
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

}
