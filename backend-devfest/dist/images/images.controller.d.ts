import { ImagesService } from './images.service';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ProcessService } from 'src/process/process.service';
export declare class ImagesController {
    private readonly imagesService;
    private readonly processService;
    constructor(imagesService: ImagesService, processService: ProcessService);
    genererFichierPourImpression(id: string, file: any): Promise<void>;
    recupererImagesSVG(id: string, res: any): Promise<any>;
    recupererImagesMosaic(id: string, res: any): Promise<any>;
    imprimerImage(file: any): string;
    initialiserWorkflow(): Promise<IImage>;
    miseAjoutPseudo(image: ImageDto): Promise<IImage>;
}
