import { Injectable} from '@nestjs/common';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { imageModel } from '../schemas/image.schema';

@Injectable()
export class ImagesService {
  
  constructor(
  ) {
  }
   /**
   * Mise à jour des informations liées à l'image avec les nouvelles informations
   * @param imageId id de l'image à mettre à jour
   * @param createImageDTO Nouveau contenu des données
   */
  async editImage(imageId, createImageDTO: ImageDto): Promise<IImage> {
    delete createImageDTO._id;
    return imageModel
    .findByIdAndUpdate(imageId, createImageDTO, { new: true });
  }

  /**
   * Initialisation d'une nouvelle image en base
   */
  async initialiserWorkflow(): Promise<IImage> {
    
    const image = new imageModel({
      pseudo : "",
      imageSelectionnee  : ""
    });
    return image.save();
  }
}
