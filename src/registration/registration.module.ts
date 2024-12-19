import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [DatabaseModule,JwtModule.register({})],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
