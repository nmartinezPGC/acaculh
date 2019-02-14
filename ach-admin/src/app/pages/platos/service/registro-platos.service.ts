import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroPlatosService {
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
  * Fecha: 31-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/platos/all-list-tipo-platos).
  * Objetivo: Visualizar los Tipos Platos Registrados
  *****************************************************/
  platosTipoViewAll(token, user_to_view) {
    const json = JSON.stringify(user_to_view);
    const params = 'json=' + json + '&authorization=' + this.getToken();
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/platos/all-list-tipo-platos', params, { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00001
  * Fecha: 31-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/platos/all-list-platos).
  * Objetivo: Visualizar los Tipos Platos Registrados
  *****************************************************/
  platosViewAll() {
    // const json = JSON.stringify(user_to_view);
    const params = 'authorization=' + this.getToken();
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/platos/all-list-platos', params, { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 31-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( /platos/plato-new ).
  * Objetivo: Agregar nuevo Plato
  *****************************************************/
  registerNewPlato(plato_to_register) {
    const json = JSON.stringify(plato_to_register);
    const params = 'json=' + json + '&authorization=' + this.getToken();
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/platos/new-plato', params, { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00002
  * Fecha: 31-01-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API ( /platos/edit-plato ).
  * Objetivo: Agregar nuevo Plato
  *****************************************************/
  editPlato(plato_to_register) {
    const json = JSON.stringify(plato_to_register);
    const params = 'json=' + json + '&authorization=' + this.getToken();
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/platos/edit-plato', params, { headers: headers }).map(res => res.json());
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
