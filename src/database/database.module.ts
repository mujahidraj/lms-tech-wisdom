import { Global, Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
@Global()
@Module({
  exports : [DatabaseService],
  controllers: [DatabaseController],
  providers: [DatabaseService]
})
export class DatabaseModule {}
