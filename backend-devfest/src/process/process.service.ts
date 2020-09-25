import { Injectable } from '@nestjs/common';
import { execFile } from 'child_process';
import { ConfigurationEnum } from 'src/common/configuration.enum';
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
   * @param args liste des arguments en paramètres de la commande
   */
  async execCommand(nomCommande: processEnum, ...args) : Promise<string>{
    const argument = args.join(" ");
    const commande = ConfigurationEnum.REPERTOIRE_SCRIPTS + nomCommande + " " + argument;
    // Log de la commande qui va être executée
    console.log(commande);
    return new Promise<string>((resolve, reject) => {
      exec(commande, (error, stdout, stderr) => {
       if (error) {
        console.warn(error.message);
       }
       resolve(stdout? stdout : stderr.message);
      });
     }); 
  }
}
