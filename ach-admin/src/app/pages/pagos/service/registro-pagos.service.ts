import { Injectable } from '@angular/core';
// Clases nesesarias para el envio via Ajax
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroPagosService {

  // Propiedades de la Clases
  // URL Base de la Clase, Referencia a la API | Symfony
  public url: string;
  public urlResourses: string;

  // Variables para el localStorage
  public identity;
  public token;

  // Constructor de la Clase
  constructor(private _http: Http,
    private _systemPropertiesService: SystemPropertiesService) {
    this.url = this._systemPropertiesService.getmethodUrlService();
    this.urlResourses = this._systemPropertiesService.getmethodUrlResourses();
  }

  /****************************************************
  * Funcion: FND-00002
  * Fecha: 28-07-2017
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( pagos/new-pago-alumno ).
  * Objetivo: Agregar Pago a Alumno
  *****************************************************/
  registerNewPagoAlumno(token, alumno_to_register) {
    const json = JSON.stringify(alumno_to_register);
    const params = 'json=' + json + '&authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/pagos/new-pago-alumno', params, { headers: headers }).map(res => res.json());
  } // FIN | FND-00002


  /**
   * Subir Imagenes de Alumno
   */
  public url_servidor = "http://localhost/acaculh/symfony-copia/web/app.php/pagos/upload-doc-pago";

  // public postFileImagen(token, imagenParaSubir: File, codAlumno: string) {
  public postFileImagen(token, imagenParaSubir: File) {
    const formData: FormData = new FormData();

    formData.append('url_documento', imagenParaSubir, imagenParaSubir.name);
    formData.append('name_url_documento', imagenParaSubir.name);
    // formData.append('cod_alumno', codAlumno);
    formData.append('authorization', token);
    // console.log('before hist the service' + JSON.stringify(formData));

    // return this.http.post(this.url_servidor, formData);
    return this._http.post(this.url + '/pagos/upload-doc-pago', formData).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00003
  * Fecha: 28-07-2017
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  *****************************************************/
  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    // Pregunta por el valor de la identity
    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  } // FIN | FND-00003


  /****************************************************
  * Funcion: FND-00004
  * Fecha: 28-07-2017
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  *****************************************************/
  getToken() {
    // No hace el parse; porque no es Json
    const token = localStorage.getItem('token');
    // Pregunta por el valor del Token
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  } // FIN | FND-00004
}
