import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
   imports : [DatabaseModule,JwtModule.register({
    global : true
   })],
  providers: [LoginService,JwtStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
