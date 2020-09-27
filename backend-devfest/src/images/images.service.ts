import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitEvent } from 'src/events/rabbit.event';
import { imageModel } from '../schemas/image.schema';
import { ImageEtatEnum } from './image.etat.enum';
import { IImage } from './image.interface';
import { ImageRabbit } from './image.rabbit';
import { ImageRenduEnum } from './image.rendu.enum';

@Injectable()
export class ImagesService {

  constructor(
    @Inject('GENERATION_GCODE') private readonly clientGenerationGCode: ClientProxy,
    @Inject('IMPRESSION_GCODE') private readonly clientImpressionGCode: ClientProxy
  ) {
  }

  /**
   * Initialisation d'une nouvelle image en base
   */
  async initialiserWorkflow(): Promise<IImage> {

    const image = new imageModel({
      pseudo: "",
      imageSelectionnee: "",
      etat: ImageEtatEnum.DEBUT_WORKFLOW,
      renduJpegLite : false,
      renduJpegTsp : false,
      renduJpegSquiddle : false
    });
    return image.save();
  }

  /**
   * Envoi des demandes de génération des gcodes dans la file rabbit
   * @param id 
   */
  sendGenerationGcodeRabbitEvent(id: string): void | PromiseLike<void> {
    let imageRabbit = new ImageRabbit;
    imageRabbit.id = id;
    // On envoi un message dans la file pour chaque type de rendu à générer
    Object.keys(ImageRenduEnum).forEach(key => {
      this.clientGenerationGCode.emit<any>(ImageRenduEnum[key], (new RabbitEvent(imageRabbit)));
    });
  }

  /**
 * Envoi des demandes de génération des gcodes dans la file rabbit
 * @param id 
 */
  sendImpressionGcodeRabbitEvent(id: string): void | PromiseLike<void> {
    let imageRabbit = new ImageRabbit;
    imageRabbit.id = id;
    // On envoi un message dans la file pour lancer la demande d'impression
    this.clientImpressionGCode.emit<any>('impression-gcode', (new RabbitEvent(imageRabbit)));
  }
}
