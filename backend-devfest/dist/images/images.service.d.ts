import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
export declare class ImagesService {
    constructor();
    editImage(imageId: any, createImageDTO: ImageDto): Promise<IImage>;
    initialiserWorkflow(): Promise<IImage>;
}
