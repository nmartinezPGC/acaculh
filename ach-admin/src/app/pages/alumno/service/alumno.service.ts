import { Injectable } from '@angular/core';

// Clases nesesarias para el envio via Ajax
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Importamos la Clase de las Propiedades del Sistema
import { SystemPropertiesService } from '../../../shared/services/systemProperties.service';
import { HttpClient } from '@angular/common/http';
import { InputFile } from 'ngx-input-file';

@Injectable()
export class AlumnoService {
  // Propiedades de la Clases
  // URL Base de la Clase, Referencia a la API | Symfony
  public url: string;
  public urlResourses: string;

  // Variables para el localStorage
  public identity;
  public token;

  // Constructor de la Clase
  constructor(private _http: Http,
    private http: HttpClient,
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
    const json = JSON.stringify(user_to_login);
    const params = 'json=' + json;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.get(this.url + '/alumno/all-list-alumnos', { headers: headers }).map(res => res.json());
  }


  /****************************************************
  * Funcion: FND-00002
  * Fecha: 28-07-2017
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (alumno/new).
  * Objetivo: Agregar nuevo Alumno
  *****************************************************/
  registerNewAlumno(token, alumno_to_register) {
    const json = JSON.stringify(alumno_to_register);
    const params = 'json=' + json + '&authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/alumno/new-alumno', params, { headers: headers }).map(res => res.json());
  }

  /****************************************************
  * Funcion: FND-00003
  * Fecha: 10-014-2019
  * Descripcion: Metodo Ajax, para Invocar el servicio
  * a la API (alumno/upload-img-alumno).
  * Objetivo: Agregar imagen Alumno
  *****************************************************/
  uploadNewAlumno(token, alumno_to_register) {
    const json = JSON.stringify(alumno_to_register);
    const params = 'authorization=' + token;
    // console.log(json);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this._http.post(this.url + '/alumno/upload-img-alumno', params, { headers: headers }).map(res => res.json());
  }


  /**
   * Subir Imagenes de Alumno
   */
  public url_servidor = "http://localhost/acaculh/symfony-copia/web/app.php/alumno/upload-img-alumno";

  // public postFileImagen(token, imagenParaSubir: File, codAlumno: string) {
  public postFileImagen(token, imagenParaSubir: File, codAlumno: string) {
    const formData: FormData = new FormData();

    formData.append('foto_alumno', imagenParaSubir, imagenParaSubir.name);
    formData.append('name_foto_alumno', imagenParaSubir.name);
    formData.append('cod_alumno', codAlumno);
    formData.append('authorization', token);
    // console.log('before hist the service' + JSON.stringify(formData));

    // return this.http.post(this.url_servidor, formData);
    return this._http.post(this.url + '/alumno/upload-img-alumno', formData).map(res => res.json());
  }





  makeFileRequest(token, url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      var name_file_input = params[0];
      var name_pdf = params[1];

      for (var i = 0; i < files.length; i++) {
        formData.append(name_file_input, files[i], files[i].name);
        formData.append("foto_alumno", name_pdf);
        alert(files[i].name);
      }

      formData.append("authorization", token);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            resolve(JSON.parse(xhr.response));
          }
        }
      }

      // Listener de la barra de Progreso
      xhr.upload.addEventListener("progress", function (event: any) {
        var percent = (event.loaded / event.total) * 100;
        let prc = Math.round(percent).toString();
        document.getElementById("upload-progress-bar").setAttribute("value", prc);
        document.getElementById("upload-progress-bar").style.width = prc + "%";
        document.getElementById("upload-progress-bar").innerHTML = Math.round(percent) + " % subido ... espera a que cargue";
      }, false);

      // Listener para el Fichero ya Subido
      xhr.addEventListener("load", function () {
        document.getElementById("upload-progress-bar").innerHTML = " Por fin se Subio !!";
        let prc = "0";
        document.getElementById("upload-progress-bar").setAttribute("value", prc);
        document.getElementById("upload-progress-bar").setAttribute("aria-valuenow", "0");
        document.getElementById("upload-progress-bar").style.width = prc + "%";
      }, false);

      // Error en la Subida
      xhr.addEventListener("error", function () {
        document.getElementById("upload-progress-bar").innerHTML = " Error en la Subida !!";
      }, false);

      // Error en la Subida
      xhr.addEventListener("abort", function () {
        document.getElementById("upload-progress-bar").innerHTML = " Subida Abortada !!";
      }, false);

      //Enviar por Post en File
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
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
