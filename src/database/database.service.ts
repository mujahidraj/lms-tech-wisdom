import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(){
        super({
            datasources:{
                db : {
                    url :'postgresql://postgres:1234@localhost:5432/TechWisdomDB?schema=public'
                }
            }
        })
    }
}
