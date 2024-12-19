import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { loginDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class LoginService {
    constructor(private databse : DatabaseService){}
    async login(dto:loginDto){
        const student=await this.databse.student.findUnique({
            where : {
                username : dto.username
            }
        });

        if (!student) {
            throw new ForbiddenException(
                'Username Does not Matched.Please Try again.'
            );
        }

        const pwMatch= await argon.verify(
            student.hash,
            dto.password
        )

        if (!pwMatch) {
            throw new ForbiddenException(
                'Password does not matched. Please try again'
            );
        }
        
       
        return student;
    }
}
