import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDto } from './dto';

@Controller('login')
export class LoginController {
    constructor(private loginService : LoginService){}
    
    @Post('User_login')
    login(@Body() dto:loginDto ){
         return this.loginService.login(dto)
    }

}
