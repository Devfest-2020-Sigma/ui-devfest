import { ImagesService } from './images.service';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ProcessService } from 'src/process/process.service';
export declare class ImagesController {
    private readonly imagesService;
    private readonly processService;
    constructor(imagesService: ImagesService, processService: ProcessService);
    initialiserWorkflow(): Promise<IImage>;
    recupererImagesSVG(id: string, res: any): Promise<any>;
    recupererImagesMosaic(id: string, res: any): Promise<Blob>;
    getImage(id: any): Promise<IImage>;
    imprimerImage(file: any): string;
    genererFichierPourImpression(id: string, file: any): Promise<void>;
    miseAjoutPseudo(image: ImageDto): void;
}
