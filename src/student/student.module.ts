import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports :[ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
