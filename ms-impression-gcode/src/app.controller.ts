import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImageRabbit } from './model/image.rabbit';
import { processEnum } from './process/process.enum';
import { ProcessService } from './process/process.service';

@Controller()
export class AppController {
  constructor(
    private readonly processService : ProcessService
  ) { }

  @EventPattern('impression-gcode')
  async handleImpressionGcode(data: Record<string, ImageRabbit>) {
    console.log("impression en cours");
    const path = data.message.id;
    await this.processService.execCommand(processEnum.SENDSVG2GCODE, path).catch(error => { console.log('caught', error.message); });;
  }
}
