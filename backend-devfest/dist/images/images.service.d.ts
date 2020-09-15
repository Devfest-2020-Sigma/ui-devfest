import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
import { IEventBus } from '@nestjs/cqrs/dist/interfaces/events/event-bus.interface';
export declare class ImagesService {
    private readonly event;
    constructor(event: IEventBus);
    editImage(imageId: any, createImageDTO: ImageDto, callback: any): Promise<IImage>;
    initialiserWorkflow(): Promise<IImage>;
    getImage(imageId: any): Promise<IImage>;
    sendRabbitEvent(id: string): void | PromiseLike<void>;
}
