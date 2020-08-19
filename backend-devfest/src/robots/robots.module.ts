import { Module } from '@nestjs/common';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';


@Module({
  imports: [],
  controllers: [RobotsController],
  providers: [RobotsService]
})
export class RobotsModule {}
