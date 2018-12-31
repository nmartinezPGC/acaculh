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
export class ConsultaAlumnoService {
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
  * Fecha: 28-07-2017
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (/alumnos/view-all-alumnos).
  * Objetivo: Visualizar los Alumnos Registrados
  *****************************************************/
  getAllAlumnos() {
    // const json = JSON.stringify(all_to_alumnos);
    // const params = 'json=' + json;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.get(this.url + '/alumno/all-list-alumnos', { headers: headers }).map(res => res.json());
  }
}
