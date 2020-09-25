import { Injectable } from '@nestjs/common';
import { CONFIGURATION } from 'src/common/configuration.enum';
import { processEnum } from './process.enum';
const util = require('util');
const exec = util.promisify(require('child_process').exec);


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
  async execCommand(nomCommande: processEnum, impressionId: string, imageSelectionne: number, pseudo: string) {
    let commande = "";
    // TODO : Ajouter une  gestion des paramètres
    if (impressionId){
      if (pseudo) {
        commande = CONFIGURATION.REPERTOIRE_SCRIPTS + nomCommande + " " + CONFIGURATION.IMPRESSION_REPERTOIRE + impressionId + "/crop " + imageSelectionne + " "+ pseudo;
      } else {
        commande = CONFIGURATION.REPERTOIRE_SCRIPTS + nomCommande + " " + CONFIGURATION.IMPRESSION_REPERTOIRE + impressionId;
      }
    } else {
      commande = CONFIGURATION.REPERTOIRE_SCRIPTS + nomCommande
    }
    // Log de la commande qui va être executée
    console.log(commande);
    return exec(commande);
  }

}
