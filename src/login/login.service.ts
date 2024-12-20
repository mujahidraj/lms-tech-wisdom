import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { loginDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoginService {
    constructor(private databse : DatabaseService ,private config:ConfigService ,private jwt:JwtService){}
    private resetTokens: Map<string, string> = new Map();
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
    async requestPasswordReset(username: string): Promise<string> {
        const user = await this.databse.student.findFirst({
            where: { username },
        });
        if (!user) {
          throw new Error('User not found');
        }
    
        const token = uuidv4();
        this.resetTokens.set(token, username);
    
        return token;
      }
    
      // Reset Password
      async resetPassword(token: string, newPassword: string): Promise<string> {
        const username = this.resetTokens.get(token);
        if (!username) {
            
            console.log('Reset password with token:', token);
            
         // throw new Error('Invalid or expired token');
        }
    
        const hashedPassword = await argon.hash(newPassword);
    
        await this.databse.student.update({
          where: { username },
          data: { hash: hashedPassword },
        });
    
        this.resetTokens.delete(token);
        return 'Password updated successfully';
      }
}
