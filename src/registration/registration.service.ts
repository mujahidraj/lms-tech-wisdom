import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { registrationDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class RegistrationService {
    constructor(private database: DatabaseService) { }
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
            delete student.hash;
            return student;
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
}

