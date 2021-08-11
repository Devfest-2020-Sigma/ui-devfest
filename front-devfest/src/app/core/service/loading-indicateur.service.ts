import {Injectable} from '@angular/core';

@Injectable()
export class ChargementIndicateurService {
  public nombreChargementsEnCours = 0;
  public urlExclues = [];
  private readonly chargementEnCours = [];

  /**
   * Affiche un spinner en plein ecran avec un timeout de 10 secondes par defaut.
   * Le timeout peut être desactivé en spécifique en positionnant le correlationId à 'disabled'
   *
   * @param log informations a logguer en cas de timeout
   */
  show(log?: object) {
    this.nombreChargementsEnCours++;
  }

  /**
   * Masque le spinner en plein ecran
   */
  hide() {
    const index = this.chargementEnCours.indexOf(0);
    this.chargementEnCours.splice(index, 1);
    this.nombreChargementsEnCours--;
  }
}
