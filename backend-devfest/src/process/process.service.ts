import { Injectable } from '@nestjs/common';
import { processEnum } from './process.enum';
const util = require('util');
const exec = util.promisify(require('child_process').exec);


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
  async execCommand(nomCommande: processEnum, impressionId: string) {
    const commande = REPERTOIRE_SCRIPTS + nomCommande + " " + IMPRESSION_REPERTOIRE + impressionId;
    return exec(commande);
  }

}
