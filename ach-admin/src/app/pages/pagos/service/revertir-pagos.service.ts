import { Injectable } from '@angular/core';
// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';

@Injectable({
  providedIn: 'root'
})
export class RevertirPagosService {

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
  * Funcion: FND-00001
  * Fecha: 01-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( pagos/all-list-pagos ).
  * Objetivo: Listar todos los Pagos Registrados por
  * todos los Alumnos en el tiempo
  *****************************************************/
  listAllPagos(token) {
    // const json = JSON.stringify(alumno_to_register);
    const params = 'authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/pagos/all-list-pagos', params, { headers: headers }).map(res => res.json());
  } // FIN | FND-00001


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 01-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( pagos/all-list-alumno-pagos ).
  * Objetivo: Listar todos los Pagos Registrados por
  * Alumnos en el tiempo
  *****************************************************/
  listAllAlumnoPagos(token, alumno_to_register) {
    const json = JSON.stringify(alumno_to_register);
    const params = 'json=' + json + '&authorization=' + token;
    // Encabezados Http a enviar
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/pagos/all-list-alumno-pagos', params, { headers: headers }).map(res => res.json());
  } // FIN | FND-00002


  /****************************************************
  * Funcion: FND-00003
  * Fecha: 01-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( pagos/all-list-alumno-pagos ).
  * Objetivo: Listar todos los Pagos Registrados por
  * Alumnos en el tiempo
  *****************************************************/
  revertirPagoAlumno(token, alumno_to_pay) {
    const json = JSON.stringify(alumno_to_pay);
    const params = 'json=' + json + '&authorization=' + token;
    // Encabezados Http a enviar
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/pagos/revert-pago-alumno', params, { headers: headers }).map(res => res.json());
  } // FIN | FND-00003


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
