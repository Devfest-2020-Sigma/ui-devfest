import { ImageDao } from 'src/images/image.dao';
import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ImageRabbit } from './image.rabbit';
import { ImageRenduEnum } from './image.rendu.enum';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    private readonly processService;
    private readonly imageDao;
    constructor(imagesService: ImagesService, processService: ProcessService, imageDao: ImageDao);
    updateImage(image: ImageDto): Promise<void>;
    initialiserWorkflow(): Promise<IImage>;
    prisePhoto(id: string, essai: string): Promise<IImage>;
    recupererImagesSVG(id: string, rendu: ImageRenduEnum, res: any): Promise<any>;
    recupererImagesMosaic(id: string, essai: string, res: any): Promise<Blob>;
    streamingstart(): void;
    getImage(id: any): Promise<IImage>;
    generationRendu(image: ImageDto): Promise<void>;
    handleIntegrationRobot(data: Record<string, ImageRabbit>): Promise<void>;
}
