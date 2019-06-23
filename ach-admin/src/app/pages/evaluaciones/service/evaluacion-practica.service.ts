import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';
import { Observable } from 'rxjs';

@Injectable()
export class EvaluacionPracticaService {
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
  * Fecha: 04-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/platos/all-list-platos).
  * Objetivo: Visualizar los Usuarios Registrados
  *****************************************************/
  platosViewAll() {
    // const json = JSON.stringify(user_to_view);
    // const params = 'json=' + json + '&authorization=' + this.getToken().token;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/platos/all-list-platos', { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( /usuarios/new-user ).
  * Objetivo: Agregar nuevo Usuario
  *****************************************************/
  registerEvaluacionCocinaPractia(user_to_register, token) {
    const json = JSON.stringify(user_to_register);
    const params = 'json=' + json + '&authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/evaluaciones/new-evaluacion-cocina-practica', params, { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( /evaulaciones/list-evaluacion-practica ).
  * Objetivo: Listar las Evaluaciones Practicas, por Alumno
  *****************************************************/
  getEvaluacionCocinaPractiaByAlumno(alumno_to_find, token) {
    const json = JSON.stringify(alumno_to_find);
    const params = 'json=' + json + '&authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/evaluaciones/list-evaluacion-practica', params, { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00003
  * Fecha: 04-01-2019
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
  }


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
  }
}
