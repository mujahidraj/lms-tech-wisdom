import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { registrationDto } from './dto';

@Controller('registration')
export class RegistrationController {
    constructor(private registrationService : RegistrationService){}

    @Post('signUp')
    signUp(@Body()dto:registrationDto){
        return this.registrationService.signUp(dto);
    }
}
