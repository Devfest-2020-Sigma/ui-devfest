import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ConfigurationEnum } from './common/configuration.enum';
import { DatabaseService } from './database/database.service';
import { ImageDto } from './images/image.dto';
import { ImageRabbit } from './images/image.rabbit';
import { processEnum } from './process/process.enum';
import { ProcessService } from './process/process.service';

@Controller()
export class AppController {
  constructor(
    private readonly processService: ProcessService,
    private readonly databaseService: DatabaseService,
  ) { }

  @EventPattern('generation-jpglite')
  async handleGenerationJpegLite(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const id = data.message.id;
    this.databaseService.getImage(id).then(async image => {
      // execution de la commande
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
      await this.processService.execCommand(processEnum.JPG2LITE, path, image.imageSelectionnee, '"' + image.pseudo + '"')
        .catch(error => { console.log('caught', error.message); });
      // mise à jour de l'etat du rendu
      let imageDto = new ImageDto();
      imageDto.renduJpegLite = true;
      this.databaseService.editImage(id, imageDto, () => { });
    });
  }

  @EventPattern('generation-tsp')
  async handleGenerationTsp(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const id = data.message.id;
    this.databaseService.getImage(id).then(async image => {
      // execution de la commande
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
      // await this.processService.execCommand(processEnum.JPG2LITE, path, image.imageSelectionnee, '"' + image.pseudo + '"')
      //   .catch(error => { console.log('caught', error.message); });
      // mise à jour de l'etat du rendu
      let imageDto = new ImageDto();
      imageDto.renduJpegTsp = true;
      this.databaseService.editImage(id, imageDto, () => { });
    });
  }

  @EventPattern('generation-squiddle')
  async handleGenerationSquiddle(data: Record<string, ImageRabbit>) {
    // récupération de l'objet en base
    const id = data.message.id;
    this.databaseService.getImage(id).then(async image => {
      // execution de la commande
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
      // await this.processService.execCommand(processEnum.JPG2LITE, path, image.imageSelectionnee, '"' + image.pseudo + '"')
      //  .catch(error => { console.log('caught', error.message); });
      // mise à jour de l'etat du rendu
      let imageDto = new ImageDto();
      imageDto.renduJpegSquiddle = true;
      this.databaseService.editImage(id, imageDto, () => { });
    });
  }
}
