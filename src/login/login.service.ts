import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { loginDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(private databse : DatabaseService ,private config:ConfigService ,private jwt:JwtService){}
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
        
       
        return this.signupToken(student.id,student.email,student.username,student.phone_number,student.address,student.enrollment_status)
    }

    async signupToken(
        student_id : number,
        email :string,
        username : string,
        phone_number :string,
        address : string,
        enrollment_status : string
    ) : Promise<{access_token : string}>
    {
        const payload = {
            id : student_id,
            username :username,
            email: email ,
            phone_number:phone_number,
            address: address,
            enrollment_status:enrollment_status
        }

        const secret = this.config.get('JWT_SECRET')

       const token = await this.jwt.signAsync(payload, {
                expiresIn : '15m',
                secret : secret
        }

        );

        return {
            access_token : token
        }
    }
}
