import {ImageEtatEnum} from "./image.etat.enum";
import {ImageRenduEnum} from "./image.rendu.enum";

export class ImageDto
{
    public pseudo: string;
    public _id: string;
    public imageSelectionnee: number;
    public renduSelectionne: ImageRenduEnum;
    public etat: ImageEtatEnum;
    public renduJpegLite: boolean;
    public renduJpegTsp: boolean;
    public renduJpegSquiggle: boolean;
    public renduJpegMst: boolean;
    public renduJpegSkip: boolean;
    public renduJpegHilbert: boolean;
}
