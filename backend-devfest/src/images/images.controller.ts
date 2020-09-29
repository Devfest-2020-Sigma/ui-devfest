import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { ConfigurationEnum } from 'src/common/configuration.enum';
import { ImageDao } from 'src/images/image.dao';
import { processEnum } from 'src/process/process.enum';
import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { ImageEtatEnum } from './image.etat.enum';
import { IImage } from './image.interface';
import { ImageRenduEnum } from './image.rendu.enum';
import { ImagesService } from './images.service';

@Controller('api/images')
export class ImagesController {

  constructor(
    private readonly imagesService: ImagesService,
    private readonly processService: ProcessService,
    private readonly imageDao: ImageDao,
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
      this.imageDao.editImage(image._id, imageDto, function () { });
      // génération des quatres images de départ
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id;
      await this.processService.execCommand(processEnum.CAPTURE_IMAGES, path);
      imageDto.etat = ImageEtatEnum.PRISE_PHOTO_EFFECTUEE;
      this.imageDao.editImage(image._id, imageDto, function () { });
      return image;
    });
  }


  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * @param res permet de lire le fichier
   */
  @Get('/getsvg/:id/:rendu')
  async recupererImagesSVG(@Param('id') id: string, @Param('rendu') rendu: ImageRenduEnum, @Res() res): Promise<any> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop';
    switch (rendu) {
      case ImageRenduEnum.JPGLITE:
        res.sendFile('jpg2lite-front.svg', { root: path });
        break;
      case ImageRenduEnum.TSP:
        res.sendFile('jpg2lite-front.svg', { root: path });
        break;
      case ImageRenduEnum.SQUIDDLE:
        res.sendFile('jpg2lite-front.svg', { root: path });
        break;
      default:
        console.error("Parametre rendu incorrect : " + rendu);
    }
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
  async getImage(@Param('id') id): Promise<IImage> {
    return this.imageDao.getImage(id);
  }


  /**
   * Permet l'impression d'une image selectionnée
   * @param file Fichier à imprimer
   */
  @Get('/imprimer/:id')
  async imprimerGcode(@Param('id') id): Promise<void> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id + '/crop/jpg2lite';
    this.imagesService.sendImpressionGcodeRabbitEvent(path);
  }

  @Put('/pseudo')
  async generationRendu(@Body() image: ImageDto): Promise<void> {
    // sauvegarde du pseudo dans la base 
    const id = image._id;
    this.imageDao.editImage(id, image, () => {
      // envoi de la demande de génération dans les files rabbit
      this.imagesService.sendGenerationGcodeRabbitEvent(id);
    })
  }
}
