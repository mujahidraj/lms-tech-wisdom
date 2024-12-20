import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { loginDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';


import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

@Injectable()
export class LoginService {
    constructor(private databse : DatabaseService ,private config:ConfigService ,private jwt:JwtService){}
    private resetTokens: Map<string, string> = new Map();
    private otpStorage = new Map<string, { otp: string; expiry: number }>();


        //...........................LOGIN.............................................


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


    //.................................ACCESS TOKEN......................................



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


    //.......................................FORGOT PASSWORD.....................................


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
    
      

      //..................................RESET PASSSWORD..........................

    
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




    //.....................one time password ...................................................




       // Generate OTP
  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }


   // Send OTP via Email
   async sendOtpEmail(email: string): Promise<void> {
    const otp = this.generateOtp();
    const expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 5 minutes
    this.otpStorage.set(email, { otp, expiry });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mujahidraj2000@gmail.com',
        pass: 'ixyp ufom gqsc nxmy',
      },
      debug: true, // Enable debug output
    logger: true, // Log additional details to the console
    });

    await transporter.sendMail({
      from: 'mujahidraj2000@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    });
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): boolean {
    const record = this.otpStorage.get(email);
    if (!record) {
      return false;
    }

    const isValid = record.otp === otp && Date.now() < record.expiry;
    if (isValid) {
      this.otpStorage.delete(email); // Clear OTP after successful verification
    }

    return isValid;
  }
}
