import { ImageEtatEnum } from "./image.etat.enum";
import { ImageRenduEnum } from "./image.rendu.enum";
export declare class ImageDto {
    pseudo: string;
    _id: string;
    imageSelectionnee: number;
    renduSelectionne: ImageRenduEnum;
    etat: ImageEtatEnum;
    renduJpegLite: boolean;
    renduJpegTsp: boolean;
    renduJpegSquiddle: boolean;
}
