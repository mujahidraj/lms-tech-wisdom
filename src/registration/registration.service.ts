import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { registrationDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegistrationService {
    constructor(private database: DatabaseService ,private jwt:JwtService ,private config: ConfigService) { }
    async signUp(dto: registrationDto) {

        const hash = await argon.hash(dto.password);
        try {

            const student = await this.database.student.create({
                data: {
                    first_name: dto.first_name,
                    last_name: dto.last_name,
                    email: dto.email,
                    phone_number: dto.phone_number,
                    username: dto.username,
                    hash,
                    address: dto.address,
                    enrollment_status: dto.enrollment_status

                },
            });
            
           return 'Registration Complete'
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code = 'P2002') {
                    throw new ForbiddenException('Duplicated Credential'

                    )
                }
            }
            throw error;
        }
        
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
            address:address,
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

