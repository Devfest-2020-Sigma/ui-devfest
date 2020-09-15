import { Inject, Injectable } from '@nestjs/common';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { imageModel } from '../schemas/image.schema';
import { ImageEtatEnum } from './image.etat.enum';
import { IEventBus } from '@nestjs/cqrs/dist/interfaces/events/event-bus.interface';
import { TRANSPORT_EVENT_BUS_SERVICE } from 'nestjs-transport-eventbus';
import { RabbitEvent } from 'src/events/rabbit.event';
import { ImageRabbit } from './image.rabbit';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ImagesService {

  constructor(
    @Inject(TRANSPORT_EVENT_BUS_SERVICE) private readonly event: IEventBus
  ) {
  }
  /**
  * Mise à jour des informations liées à l'image avec les nouvelles informations
  * @param imageId id de l'image à mettre à jour
  * @param createImageDTO Nouveau contenu des données
  */
  async editImage(imageId, createImageDTO: ImageDto, callback): Promise<IImage> {
    delete createImageDTO._id;
    console.log(createImageDTO);
    console.log(imageId);
    return imageModel
      .findByIdAndUpdate(imageId, createImageDTO, callback);
  }

  /**
   * Initialisation d'une nouvelle image en base
   */
  async initialiserWorkflow(): Promise<IImage> {

    const image = new imageModel({
      pseudo: "",
      imageSelectionnee: "",
      etat: ImageEtatEnum.DEBUT_WORKFLOW

    });
    return image.save();
  }

  /**
   * Fonction qui récupère une image en base
   */
  getImage(imageId): Promise<IImage> {
    return imageModel.findById(imageId);
  }

  /**
   * Envoi du gcode dans la file d'impression
   * @param id 
   */
  sendRabbitEvent(id: string): void | PromiseLike<void> {
    let imageRabbit = new ImageRabbit;
    imageRabbit.id = id;

    this.event.publish(new RabbitEvent(imageRabbit));
  }
}
