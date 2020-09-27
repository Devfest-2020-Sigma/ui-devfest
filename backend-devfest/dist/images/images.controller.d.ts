import { DatabaseService } from 'src/database/database.service';
import { ProcessService } from 'src/process/process.service';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    private readonly processService;
    private readonly databaseService;
    constructor(imagesService: ImagesService, processService: ProcessService, databaseService: DatabaseService);
    initialiserWorkflow(): Promise<IImage>;
    recupererImagesSVG(id: string, res: any): Promise<any>;
    recupererImagesMosaic(id: string, res: any): Promise<Blob>;
    streamingstart(): void;
    getImage(id: any): Promise<IImage>;
    imprimerGcode(id: any): Promise<void>;
    generationRendu(image: ImageDto): Promise<void>;
}
