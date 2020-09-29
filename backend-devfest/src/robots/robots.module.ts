import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProcessService } from 'src/process/process.service';
import { RobotDao } from './robot.dao';
import { RobotsController } from './robots.controller';
import { robotsProviders } from './robots.provider';
import { RobotsService } from './robots.service';


@Module({
  imports: [DatabaseModule],
  controllers: [RobotsController],
  providers: [RobotsService, ProcessService, RobotDao,...robotsProviders]
})
export class RobotsModule {}
