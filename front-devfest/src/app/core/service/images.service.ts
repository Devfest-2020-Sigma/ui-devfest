import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '@model/image.model';
import {imageToFile} from '@app/shared/utils/image.util';

const url = 'api/images';

@Injectable({providedIn: 'root'})
export class ImagesService
{
  constructor(private http: HttpClient)
  {
  }

  /**
   * Fonction qui permet de récupérer à partir de son id
   */
  recupererImage(id: string): Observable<Image>
  {
    return this.http.get<Image>(`${url}/${id}`);
  }

  /**
   * Fonction de génération de l'image prise avec la caméra
   * @param image Image à générer pour impression
   * @param id id de l'image
   */
  generer(image: string, id: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageToFile(image, id));
    return this.http.post<string>(`${url}/test?id=` + id, formData);
  }

  /**
   * Fonction de récupération des images générées par le PNG
   * @param id id de l'image
   * @param essai le numéro de l'essai
   */
  recupererPhoto(id: string, essai: string): Observable<Blob>
  {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<any>(`${url}/getphoto/${id}/${essai}`, {headers, responseType: 'blob' as 'json'});
  }

  /**
   * Fonction d'initilisation du workflow
   * Retourne une entité vide avec l'id de l'image qui sera utilisé pour le workflow
   */
  initialiserWorkflow(): Observable<Image> {
    return this.http.get<Image>(`${url}/initialiser`);
  }

  /**
   * Fonction qui prend la photo
   * @param id id du workflow lié à la prise de la photo
   * @param essai le numéro de l'essai
   */
  prisePhoto(id: string, essai: string): Observable<Image> {
    return this.http.get<Image>(`${url}/prise-photo/${id}/${essai}`);
  }

  /**
   * Fonction de mise à jour de l'image en Bdd
   * @param image Image à générer pour impression
   */
  miseAjourImageBdd(image: Image){
    return this.http.put<Image>(`${url}`, image);
  }

  /**
   * Mise à jour du pseudo dans la BDD
   * @param image Image à générer pour impression
   */
  genererSVG(image: Image): Observable<Image>
  {
    return this.http.put<Image>(`${url}/generer-svg`, image);
  }

  /**
   * Controller permettant le démarrage du streaming (/ l'arrêt est géré en interne lors de l'action de la prise de la photo)
   */
  demarrerStreaming(): Observable<any> {
    return this.http.get<any>(`${url}/streaming`);
  }
}
