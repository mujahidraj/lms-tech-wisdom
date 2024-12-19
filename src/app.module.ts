import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RegistrationModule } from './registration/registration.module';
import { DatabaseModule } from './database/database.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ RegistrationModule, DatabaseModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
