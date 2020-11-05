import { ClientProxy } from '@nestjs/microservices';
import { ImageDto } from './image.dto';
import { IImage } from './image.interface';
export declare class ImagesService {
    private readonly clientGenerationGCode;
    private readonly clientImpressionGCode;
    constructor(clientGenerationGCode: ClientProxy, clientImpressionGCode: ClientProxy);
    initialiserWorkflow(): Promise<IImage>;
    sendGenerationGcodeRabbitEvent(image: ImageDto): void | PromiseLike<void>;
    sendImpressionGcodeRabbitEvent(id: string): void | PromiseLike<void>;
}
