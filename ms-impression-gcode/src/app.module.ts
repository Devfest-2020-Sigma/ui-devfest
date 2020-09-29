import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { RobotDao } from './model/robot.dao';
import { robotsProviders } from './model/robots.provider';
import { ProcessService } from './process/process.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ProcessService, RobotDao, ...robotsProviders],
})
export class AppModule { }
