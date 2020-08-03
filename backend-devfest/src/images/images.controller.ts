import { Body, Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ProcessService } from 'src/process/process.service';
import { processEnum } from 'src/process/process.enum';

const INIT_FILE_NAME = 'initial.jpg';

@Controller('api/images')
export class ImagesController {

  constructor(
    private readonly imagesService: ImagesService,
    private readonly processService: ProcessService
  ) { }

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
    imageDto.photoInitiale = file;
    //  return this.imagesService.rabbitEvent(imageDto);
  }

  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * TODO : Passer en paramètre l'uuid plutôt que le pseudo
   * @param res permet de lire le fichier
   */
  @Get('/getsvg/:id')
  async recupererImagesSVG(@Param('id') id: string, @Res() res): Promise<any> {
    res.sendFile('chuck.svg', { root: 'impressions' });
  }

  /**
   * Fonction qui permet l'ensemble des images générées dans un tableau
   * @param pseudo Pseudo des images à récupérer
   * TODO : Passer en paramètre l'uuid plutôt que le pseudo
   * @param res permet de lire le fichier
   */
  @Get('/getmosaic/:id')
  async recupererImagesMosaic(@Param('id') id: string, @Res() res): Promise<any> {
    res.sendFile('mosaic.jpg', { root: 'impressions/' + id });
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

  /**
   * Fonction d'initialisation d'une nouvelle image
   */
  @Get('/initialiser')
  async initialiserWorkflow(): Promise<IImage> {
    return this.imagesService.initialiserWorkflow().then(value => {
      // génération des quatres images de départ
      this.processService.execCommand(processEnum.CAPTURE_IMAGES, value._id);
      return value;
    });
  }

  @Put('/pseudo')
  async miseAjoutPseudo(@Body() image: ImageDto): Promise<IImage> {
    return this.imagesService.editImage(image._id, image).then(value => {
      // Génération de la conversion de l'image selectionnée en svg
      this.processService.execCommand(processEnum.JPG2GCODE, value._id);
      return value;
    });
  }

}
