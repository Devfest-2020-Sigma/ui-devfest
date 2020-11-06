import { Body, Controller, Get, Param, Put, Res } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ConfigurationEnum } from 'src/common/configuration.enum';
import { ImageDao } from 'src/images/image.dao';
import { processEnum } from 'src/process/process.enum';
import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { ImageEtatEnum } from './image.etat.enum';
import { IImage } from './image.interface';
import { ImageRabbit } from './image.rabbit';
import { ImagesService } from './images.service';

@Controller('api/images')
export class ImagesController {

  constructor(
    private readonly imagesService: ImagesService,
    private readonly processService: ProcessService,
    private readonly imageDao: ImageDao,
  ) { }

  @Put()
  async updateImage(@Body() image: ImageDto): Promise<void> {
    // sauvegarde du pseudo dans la base 
    const id = image._id;
    this.imageDao.editImage(id, image, () => { });
  }


  /**
   * Fonction d'initialisation d'un nouveau workflow
   */
  @Get('/initialiser')
  initialiserWorkflow(): Promise<IImage> {
    return this.imagesService.initialiserWorkflow();
  }

  /**
   * Fonction qui prend les photos
   * @param id id du workflow en cours
   * @param essai numero de l'essai
   */
  @Get('/prise-photo/:id/:essai')
  prisePhoto(@Param('id') id: string, @Param('essai') essai: string): Promise<IImage> {
    return this.imageDao.getImage(id).then(async image => {
      let imageDto = new ImageDto();
      console.log('arret du streaming');
      await this.processService.execCommand(processEnum.STREAMING_STOP);
      // Mise à jour état de image
      imageDto.etat = ImageEtatEnum.PRISE_PHOTO_EN_COURS;
      this.imageDao.editImage(image._id, imageDto, function () { });
      // génération des quatres images de départ
      const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + image._id;
      await this.processService.execCommand(processEnum.CAPTURE_IMAGES, path, essai);
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
  @Get('/getsvg/:id')
  async recupererImagesSVG(@Param('id') id: string, @Res() res): Promise<any> {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + id;
    res.sendFile('impression.svg', { root: path });
  }

  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * @param res permet de lire le fichier
   */
  @Get('/getphoto/:id/:essai')
  async recupererImagesMosaic(@Param('id') id: string, @Param('essai') essai: string, @Res() res): Promise<Blob> {
    return res.sendFile('capture-' + essai + '.jpg', { root: ConfigurationEnum.IMPRESSION_REPERTOIRE + id });
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

  @Put('/generer-svg')
  async generationRendu(@Body() image: ImageDto): Promise<void> {
    // sauvegarde du pseudo dans la base 
    const id = image._id;
    this.imageDao.editImage(id, image, () => {
      this.imageDao.getImage(id).then(async iimage => {
        // envoi de la demande de génération dans les files rabbit
        this.imagesService.sendGenerationGcodeRabbitEvent(iimage);
      });
    });
  }

  // Mise à jour de l'etat de generation des svgs et demande d'impression
  @EventPattern('impression-gcode')
  async handleIntegrationRobot(data: Record<string, ImageRabbit>) {
    const path = ConfigurationEnum.IMPRESSION_REPERTOIRE + data.message.id + '/impression';
    this.imagesService.sendImpressionGcodeRabbitEvent(path);
  }
}
