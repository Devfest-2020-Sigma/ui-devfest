import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
export declare class ImagesService {
    constructor();
    editImage(imageId: any, createImageDTO: ImageDto, callback: any): Promise<IImage>;
    initialiserWorkflow(): Promise<IImage>;
    getImage(imageId: any): Promise<IImage>;
}
