import { Injectable } from '@angular/core';
import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';

// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionConsultaService {
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
  evaluacionesViewAll(token: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'authorization=' + token;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/all-list-evaluaciones', params, { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/aprobar-evaluacion-cocina-practica).
  * Objetivo: Aprobar Evaluacion Practica
  *****************************************************/
  aprobarEvaluacionPractica(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/aprobar-evaluacion-cocina-practica', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00003
  * Fecha: 04-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/anular-evaluacion-cocina-practica).
  * Objetivo: Anular Evaluacion Practica
  *****************************************************/
  anularEvaluacionPractica(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/anular-evaluacion-cocina-practica', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00004
  * Fecha: 30-03-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/aprobar-evaluacion-cortes-precision).
  * Objetivo: Aprobar Evaluacion Cortes de Precison
  *****************************************************/
  aprobarEvaluacionCortePrecison(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/aprobar-evaluacion-cortes-precision', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00005
  * Fecha: 30-03-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/anular-evaluacion-cortes-precision).
  * Objetivo: Anular Evaluacion Cortes de Precison
  *****************************************************/
  anularEvaluacionCortePrecison(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/anular-evaluacion-cortes-precision', params,
      { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00004
  * Fecha: 30-03-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/aprobar-evaluacion-plato).
  * Objetivo: Aprobar Evaluacion Plato
  *****************************************************/
  aprobarEvaluacionPlato(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/aprobar-evaluacion-plato', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00005
  * Fecha: 30-03-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/anular-evaluacion-plato).
  * Objetivo: Anular Evaluacion Plato
  *****************************************************/
  anularEvaluacionPlato(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/anular-evaluacion-plato', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
    * Funcion: FND-00004
    * Fecha: 30-03-2019
    * Descripcion: Metodo Ajax, para Invocar el servicio
    * a la API (/evaluaciones/aprobar-evaluacion-plato).
    * Objetivo: Aprobar Evaluacion Queso
    *****************************************************/
  aprobarEvaluacionQueso(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/aprobar-evaluacion-queso', params,
      { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00005
  * Fecha: 30-03-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/evaluaciones/anular-evaluacion-plato).
  * Objetivo: Anular Evaluacion Queso
  *****************************************************/
  anularEvaluacionQueso(token: any, json: any) {
    // const json = JSON.stringify(user_to_view);
    const params = 'json=' + JSON.stringify(json) + '&authorization=' + token;
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + '/evaluaciones/anular-evaluacion-queso', params,
      { headers: headers }).map(res => res.json());
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
