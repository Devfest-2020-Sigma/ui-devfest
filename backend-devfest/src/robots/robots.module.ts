import { Module } from '@nestjs/common';
import { ProcessService } from 'src/process/process.service';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';


@Module({
  imports: [],
  controllers: [RobotsController],
  providers: [RobotsService, ProcessService]
})
export class RobotsModule {}
