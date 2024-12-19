import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { loginDto } from './dto';

@Controller('login')
export class LoginController {
    constructor(private loginService : LoginService){}
    @HttpCode(HttpStatus.OK)
    @Post('User_login')
    login(@Body() dto:loginDto ){
         return this.loginService.login(dto)
    }

}
