import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../model/image.model';
import { imageToFile } from '../../shared/utils/image.util';

const url = 'api/images';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  constructor(private http: HttpClient) { }

  /**
   * Fonction qui permet de récupérer à partir de son id
   */
  recupererImage(id: string): Observable<Image> {
    return this.http.get<Image>(`${url}/${id}`);
  }

  /**
   * Fonction de génération de l'image prise avec la caméra
   * @param image Image à générer pour impression
   */
  generer(image: string, id: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageToFile(image, id));
    return this.http.post<string>(`${url}/test?id=` + id, formData);
  }

  /**
   * Fonction permettant la récupération des images générées
   * @param image Image contenant les informations permettant la récupération des images générées par le back
   */
  recupererImagesSVG(image: Image): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<any>(`${url}/getsvg/${image._id}`, { headers, responseType: 'text' as 'json' });
  }

  /**
   * Fonction de récupération des images générées par le PNG
   * @param image
   */
  recupererMosaic(id: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<any>(`${url}/getmosaic/${id}`, { headers, responseType: 'blob' as 'json' });
  }

  /**
   * Fonction permettant l'impression de l'image selectionnée
   * @param image Image contenant l'image selectionnée à imprimer
   */
  impressionImage(image: string, id: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageToFile(image, id));
    return this.http.post<string>(`${url}/imprimer`, formData);
  }

  /**
   * Fonction d'initilisation du workflow
   * Retourne une entité vide avec l'id de l'image qui sera utilisé pour le workflow
   */
  initialiserWorkflow(): Observable<Image> {
    return this.http.get<Image>(`${url}/initialiser`);
  }

  /**
   * Mise à jour du pseudo dans la BDD
   */
  miseAjourPseudo(id: string, numero : number, pseudo : string): Observable<Image> {
    let image = new Image;
    image._id = id;
    image.pseudo = pseudo;
    image.imageSelectionnee = numero;
    return this.http.put<Image>(`${url}/pseudo`, image);
  }
}
