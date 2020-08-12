import { Injectable} from '@nestjs/common';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { imageModel } from '../schemas/image.schema';
import { ImageEtatEnum } from './image.etat.enum';

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
  async editImage(imageId, createImageDTO: ImageDto, callback): Promise<IImage> {
    delete createImageDTO._id;
//    console.log(createImageDTO);
    return imageModel
    .findByIdAndUpdate(imageId, createImageDTO, callback);
  }

  /**
   * Initialisation d'une nouvelle image en base
   */
  async initialiserWorkflow(): Promise<IImage> {
    
    const image = new imageModel({
      pseudo : "",
      imageSelectionnee  : "",
      etat : ImageEtatEnum.DEBUT_WORKFLOW

    });
    return image.save();
  }

  /**
   * Fonction qui récupère une image en base
   */
   getImage(imageId) : Promise<IImage>{
    return imageModel.findById(imageId);
  }
}
