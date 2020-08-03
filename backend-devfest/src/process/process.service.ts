import {Injectable} from '@nestjs/common';
import {exec} from 'child_process';
import {processEnum} from './process.enum';

const IMPRESSION_REPERTOIRE = './impressions/';
const REPERTOIRE_SCRIPTS = 'scripts/';

@Injectable()
export class ProcessService {
  constructor(
  ) {
  }

/**
 * Fonction d'execution d'une commande
 * @param nomCommande nom de la commande a executer
 * @param impressionId id de l'impressions qui correspond au repertoire dans lequel seront enregistré les photos
 */
 execCommand(nomCommande : processEnum, impressionId : string): void {
    const commande  = REPERTOIRE_SCRIPTS + nomCommande + " " + IMPRESSION_REPERTOIRE + impressionId;
    console.log(commande);
    exec(commande, (err, stdout, stderr)  =>{
      console.log(stdout);
      console.log(stderr);
    });
  }

}
