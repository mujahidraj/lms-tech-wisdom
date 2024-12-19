import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RegistrationService {
    constructor(private database : DatabaseService){}
    signUp(){
        
    }
}
