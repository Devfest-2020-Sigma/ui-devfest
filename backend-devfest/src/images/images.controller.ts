import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigurationEnum } from 'src/common/configuration.enum';
import { processEnum } from 'src/process/process.enum';
import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { ImageEtatEnum } from './image.etat.enum';
import { IImage } from './image.interface';
import { ImagesService } from './images.service';

@Controller('api/images')
export class ImagesController {

  constructor(
    private readonly imagesService: ImagesService,
    private readonly processService: ProcessService
  ) { }

  /**
   * Fonction d'initialisation d'une nouvelle image
   */
  @Get('/initialiser')
  initialiserWorkflow(): Promise<IImage> {
    return this.imagesService.initialiserWorkflow().then(async image => {
      let imageDto = new ImageDto();
      console.log('arret du streaming');
      await this.processService.execCommand(processEnum.STREAMING_STOP);
      // Mise à jour état de image
      imageDto.etat = ImageEtatEnum.PRISE_PHOTO_EN_COURS;
      this.imagesService.editImage(image._id, imageDto, function(){});
      // génération des quatres images de départ
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id ;
      await this.processService.execCommand(processEnum.CAPTURE_IMAGES, path);
      imageDto.etat = ImageEtatEnum.PRISE_PHOTO_EFFECTUEE;
      this.imagesService.editImage(image._id, imageDto, function(){});
      return image;
    });
  }


  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * @param res permet de lire le fichier
   */
  @Get('/getsvg/:id')
  async recupererImagesSVG(@Param('id') id: string, @Res() res): Promise<any> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
    res.sendFile('jpg2lite-front.svg', { root: path });
  }

  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * @param res permet de lire le fichier
   */
  @Get('/getmosaic/:id')
  async recupererImagesMosaic(@Param('id') id: string, @Res() res): Promise<Blob> {
    return res.sendFile('mosaic.jpg', { root: ConfigurationEnum.IMPRESSION_REPERTOIRE + id });
  }

    /**
   * Controller qui permet de démarrer le streaming de la caméra
   */
  @Get('/streaming')
  streamingstart() {
    console.log('Debut du streaming');
    this.processService.execCommand(processEnum.STREAMING_START).catch(error => { console.log('caught', error.message); });
  } 

  /**
   * Controller qui récupère une image en base de donnée
   * @param id id de l'image a récupérer
   */
  @Get(':id')
  async getImage(@Param('id') id) : Promise<IImage>{
    return this.imagesService.getImage(id);
  }


  /**
   * Permet l'impression d'une image selectionnée
   * @param file Fichier à imprimer
   */
  @Get('/imprimer/:id')
  async imprimerGcode(@Param('id') id): Promise<void> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop/jpg2lite';
    await this.processService.execCommand(processEnum.SENDSVG2GCODE, path).catch(error => { console.log('caught', error.message); });;
  }
  
  @Put('/pseudo')
  async miseAjoutPseudo(@Body() image: ImageDto) : Promise<void> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id + '/crop';
    await this.processService.execCommand(processEnum.JPG2LITE, path, image.imageSelectionnee, '"'+image.pseudo+'"').catch(error => { console.log('caught', error.message); });
  }
}
