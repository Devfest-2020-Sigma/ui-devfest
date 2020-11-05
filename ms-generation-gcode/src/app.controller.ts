import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ConfigurationEnum } from './common/configuration.enum';
import { ImageDto } from './images/image.dto';
import { ImageRabbit } from './images/image.rabbit';
import { ImageRabbitEvent } from './images/image.rabbit.event';
import { processEnum } from './process/process.enum';
import { ProcessService } from './process/process.service';

@Controller()
export class AppController {
  constructor(
    private readonly processService: ProcessService,
    @Inject('IMPRESSION_GCODE') private readonly clientImpressionGCode: ClientProxy
  ) { }

  @EventPattern('generation-jpglite')
  async handleGenerationJpegLite(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const image = data.message;
    // execution de la commande
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image.id;
    await this.processService.execCommand(processEnum.JPG2LITE, path, image.imageSelectionnee, '"' + image.pseudo + '"')
      .catch(error => { console.log('caught', error.message); });
    // Envoi d'un message pour indiquer la fin de la génération du svg
    this.clientImpressionGCode.emit<any>('impression-svg', new ImageRabbitEvent(image));
  }

  @EventPattern('generation-tsp')
  async handleGenerationTsp(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const image = data.message;
    // execution de la commande
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image.id;
    // await this.processService.execCommand(processEnum.JPG2TSP path, image.imageSelectionnee, '"' + image.pseudo + '"')
    //   .catch(error => { console.log('caught', error.message); });
    // Envoi d'un message pour indiquer la fin de la génération du svg
    this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
  }

  @EventPattern('generation-squiddle')
  async handleGenerationSquiddle(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const image = data.message;

    // execution de la commande
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image.id;
    // await this.processService.execCommand(processEnum.JPG2SQUIGGLE, path, image.imageSelectionnee, '"' + image.pseudo + '"')
    //  .catch(error => { console.log('caught', error.message); });
    // Envoi d'un message pour indiquer la fin de la génération du svg
    this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
  }
}
