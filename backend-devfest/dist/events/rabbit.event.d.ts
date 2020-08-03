import { ImageDto } from '../images/image.dto';
export declare class RabbitEvent {
    readonly message: ImageDto;
    constructor(message: ImageDto);
}
