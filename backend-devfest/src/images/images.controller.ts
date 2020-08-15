import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ProcessService } from 'src/process/process.service';
import { processEnum } from 'src/process/process.enum';
import { ImageEtatEnum } from './image.etat.enum';

const INIT_FILE_NAME = 'initial.jpg';

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
      
      // Mise à jour état de image
      imageDto.etat = ImageEtatEnum.PRISE_PHOTO_EN_COURS;
      this.imagesService.editImage(image._id, imageDto, function(){});
      // génération des quatres images de départ
      await this.processService.execCommand(processEnum.CAPTURE_IMAGES, image._id, null);
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
    res.sendFile('chuck.svg', { root: 'impressions' });
  }

  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * @param res permet de lire le fichier
   */
  @Get('/getmosaic/:id')
  async recupererImagesMosaic(@Param('id') id: string, @Res() res): Promise<Blob> {
    return res.sendFile('mosaic.jpg', { root: 'impressions/' + id });
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
  @Post('/imprimer')
  @UseInterceptors(FileInterceptor('file'))
  imprimerImage(@UploadedFile() file): string {
    console.log(file);
    return null;
  }

  @Post('/test')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = './impressions/' + req.query.id;
          // Create folder if doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          return cb(null, INIT_FILE_NAME);
        }
      })
    }
  )
  )
  async genererFichierPourImpression(@Param('id') id: string, @UploadedFile() file): Promise<void> {
    const imageDto = new ImageDto();
    imageDto._id = id;
    //imageDto.photoInitiale = file;
    //  return this.imagesService.rabbitEvent(imageDto);
  }

  
  @Put('/pseudo')
  miseAjoutPseudo(@Body() image: ImageDto) {
    this.processService.execCommand(processEnum.JPG2GCODE, image._id, image.pseudo);
  }
}
