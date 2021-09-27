import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {ConfigurationEnum} from './common/configuration.enum';
import {ImageRabbit} from './model/image.rabbit';
import {processEnum} from './process/process.enum';
import {ProcessService} from './process/process.service';

@Controller()
export class AppController
{
  constructor(
      private readonly processService: ProcessService
  )
  {
  }

  @EventPattern('impression-gcode')
  async handleImpressionGcode(data: Record<string, ImageRabbit>)
  {
    console.log("impression en cours");
    const id = data.message.id;
    const fichier = 'impression';
    const url = 'http://' + process.env.RABBIT_HOST + ':3000/api/images/getsvg/'
    const folder = ConfigurationEnum.IMPRESSION_REPERTOIRE;
    await this.processService.execCommand(processEnum.SENDSVG2GCODE, url, id, fichier, folder).catch(error => { console.log('caught', error.message); });;
  }
}
