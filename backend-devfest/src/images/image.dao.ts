import { Injectable } from "@nestjs/common";
import { ImageDto } from "src/images/image.dto";
import { IImage } from "src/images/image.interface";
import { imageModel } from "src/schemas/image.schema";

@Injectable()
export class ImageDao {

     /**
  * Mise à jour des informations liées à l'image avec les nouvelles informations
  * @param imageId id de l'image à mettre à jour
  * @param createImageDTO Nouveau contenu des données
  */
  async editImage(imageId, createImageDTO: ImageDto, callback): Promise<IImage> {
    delete createImageDTO._id;
    return imageModel
      .findByIdAndUpdate(imageId, createImageDTO, callback);
  }

  /**
   * Fonction qui récupère une image en base
   */
  getImage(imageId): Promise<IImage> {
    return imageModel.findById(imageId);
  }
}