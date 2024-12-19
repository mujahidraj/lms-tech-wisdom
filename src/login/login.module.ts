import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports : [DatabaseModule,JwtModule.register({})],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
