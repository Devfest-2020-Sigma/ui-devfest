import { Injectable } from '@angular/core';

@Injectable()
export class ChargementIndicateurService {
  public nombreChargementsEnCours = 0;
  public urlExclues = [];
  private readonly chargementEnCours = [];

  /**
   * Affiche un spinner en plein ecran avec un timeout de 10 secondes par defaut.
   * Le timeout peut être desactivé en spécifique en positionnant le correlationId à 'disabled'
   *
   * @param correlationId un uuid v4 ou disabled
   * @param log informations a logguer en cas de timeout
   */
  show(log?: object) {
    this.nombreChargementsEnCours++;
  }

  /**
   * Masque le spinner en plein ecran pour un correlationId donné.
   * @param correlationId l'id du
   */
  hide() {
    const index = this.chargementEnCours.indexOf(0);
    this.chargementEnCours.splice(index, 1);
    this.nombreChargementsEnCours--;
  }
}
