import {Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {diskStorage} from 'multer';
import {FileInterceptor} from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import {existsSync, mkdirSync} from 'fs';
import {ConfigurationEnum} from 'src/common/configuration.enum';
import {ImageDao} from 'src/images/image.dao';
import {processEnum} from 'src/process/process.enum';
import {ProcessService} from 'src/process/process.service';
import {ImageDto} from './image.dto';
import {ImageEtatEnum} from './image.etat.enum';
import {IImage} from './image.interface';
import {ImageRabbit} from './image.rabbit';
import {ImagesService} from './images.service';

@Controller('api/images')
export class ImagesController
{

  constructor(
      private readonly imagesService: ImagesService,
      private readonly processService: ProcessService,
      private readonly imageDao: ImageDao,
  )
  {
  }

  @Put()
  async updateImage(@Body() image: ImageDto): Promise<void>
  {
    // sauvegarde du pseudo dans la base 
    const id = image._id;
    console.log('Update image : ', image);
    this.imageDao.editImage(id, image, () =>
    {
      // Empty
    });
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
  streamingstart()
  {
    console.log('Debut du streaming');
    this.processService.execCommand(processEnum.STREAMING_START).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  @Get('/stopStreaming')
  streamingStop()
  {
    console.log('Fin du streaming');
    this.processService.execCommand(processEnum.STREAMING_STOP).catch(error =>
    {
      console.log('caught', error.message);
    });
  }

  /**
   * Controller qui récupère une image en base de donnée
   * @param id id de l'image a récupérer
   */
  @Get(':id')
  async getImage(@Param('id') id): Promise<IImage>
  {
    return this.imageDao.getImage(id);
  }

  @Put('/generer-svg')
  async generationRendu(@Body() image: ImageDto): Promise<void>
  {
    // sauvegarde du pseudo dans la base 
    const id = image._id;
    console.log('Rendering for image : ', image);
    this.imageDao.editImage(id, image, () =>
    {
      this.imageDao.getImage(id).then(async iimage =>
      {
        // envoi de la demande de génération dans les files rabbit
        this.imagesService.sendGenerationGcodeRabbitEvent(iimage);
      });
    });
  }

  
  @Post('/upload-svg/:id')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = ConfigurationEnum.IMPRESSION_REPERTOIRE + req.params.id;
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          return cb(null, 'impression.svg');
        }
      })
    }
    )
  )
  async uploadSvg(@Param('id') id: string, @UploadedFile() file): Promise<void> {
    console.log('Upload du svg pour l\'id ' + id);
  }

  // Mise à jour de l'etat de generation des svgs et demande d'impression
  @EventPattern('impression-gcode')
  async handleIntegrationRobot(data: Record<string, ImageRabbit>) {
    console.log("Reception d'une demande d'impression pour l'id " + data.message.id);
    this.imagesService.sendImpressionGcodeRabbitEvent(data.message.id);
  }
}
