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

    @Post('forgot-password')
    async forgotPassword(@Body('username') username: string): Promise<string> {
      const token = await this.loginService.requestPasswordReset(username);
      return `Reset token: ${token}`;
    }
  
    @Post('reset-password')
    async resetPassword(
      @Body('token') token: string,
      @Body('newPassword') newPassword: string,
    ): Promise<string> {
      return this.loginService.resetPassword(token, newPassword);
    }

}
