import { processEnum } from './process.enum';
export declare class ProcessService {
    constructor();
    execCommand(nomCommande: processEnum, ...args: any[]): Promise<string>;
}
