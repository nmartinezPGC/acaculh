import { Injectable } from '@angular/core';

//Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from "../../../shared/services/systemProperties.service";

@Injectable()
export class AlumnoService {
  //Propiedades de la Clases
  //URL Base de la Clase, Referencia a la API | Symfony
  public url: string;
  public urlResourses: string;

  //Variables para el localStorage
  public identity;
  public token;

  //Constructor de la Clase
  constructor(private _http: Http,
    private _systemPropertiesService: SystemPropertiesService) {
    this.url = this._systemPropertiesService.getmethodUrlService();
    this.urlResourses = this._systemPropertiesService.getmethodUrlResourses();
  }

  /****************************************************
  * Funcion: FND-00001
  * Fecha: 28-07-2017
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/alumnos/view-all-alumnos).
  * Objetivo: Visualizar los Alumnos Registrados
  *****************************************************/
  alumnoViewAll(user_to_login) {
    let json = JSON.stringify(user_to_login);
    let params = "json=" + json;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + "/login", params, { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 28-07-2017
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (alumno/new).
  * Objetivo: Agregar nuevo Alumno
  *****************************************************/
  registerNewAlumno(token, alumno_to_register) {
    let json = JSON.stringify(alumno_to_register);
    let params = "json=" + json + "&authorization=" + token;
    //console.log(json);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + "/alumno/new-alumno", params, { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00003
  * Fecha: 28-07-2017
  * Descripcion: Metodo para obtener los Datos de la
  * variable identity del localStorage
  * Objetivo: Seteo de las variables en json
  *****************************************************/
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    //Pregunta por el valor de la identity
    if (identity != "undefined") {
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
    //No hace el parse; porque no es Json
    let token = localStorage.getItem('token');
    //Pregunta por el valor del Token
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}
