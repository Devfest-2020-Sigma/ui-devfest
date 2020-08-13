import { processEnum } from './process.enum';
export declare class ProcessService {
    constructor();
    execCommand(nomCommande: processEnum, impressionId: string, pseudo: string): Promise<any>;
}
