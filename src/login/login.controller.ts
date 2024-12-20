import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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








    //One time password



  @Post('send')
  async sendOtp(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    await this.loginService.sendOtpEmail(email);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify')
  verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required');
    }

    const isValid = this.loginService.verifyOtp(email, otp);
    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    return { message: 'OTP verified successfully' };
  }

}
