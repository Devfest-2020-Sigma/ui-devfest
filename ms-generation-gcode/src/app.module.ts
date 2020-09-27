import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { imagesProviders } from './images/images.provider';
import { ProcessService } from './process/process.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [ ProcessService, DatabaseService,...imagesProviders]
})
export class AppModule {}
