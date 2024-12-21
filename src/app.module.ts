import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';



import { RegistrationModule } from './registration/registration.module';
import { DatabaseModule } from './database/database.module';
import { LoginModule } from './login/login.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), RegistrationModule, DatabaseModule, LoginModule, StudentModule, CourseModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
