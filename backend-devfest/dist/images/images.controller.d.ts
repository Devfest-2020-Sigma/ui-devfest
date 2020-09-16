import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    private readonly processService;
    constructor(imagesService: ImagesService, processService: ProcessService);
    initialiserWorkflow(): Promise<IImage>;
    recupererImagesSVG(id: string, res: any): Promise<any>;
    recupererImagesMosaic(id: string, res: any): Promise<Blob>;
    streamingstart(): void;
    getImage(id: any): Promise<IImage>;
    imprimerGcode(id: any): Promise<void>;
    miseAjoutPseudo(image: ImageDto): Promise<void>;
}
