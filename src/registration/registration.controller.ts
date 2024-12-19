import { Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
    constructor(private registrationService : RegistrationService){}

    @Post('signUp')
    signUp(){
        return this.registrationService.signUp();
    }
}
