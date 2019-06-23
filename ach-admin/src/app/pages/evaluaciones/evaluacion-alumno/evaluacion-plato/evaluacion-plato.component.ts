import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EvaluacionPracticaService } from '../../service/evaluacion-practica.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { EvaluacionesModel } from '../../model/evaluaciones.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ListasComunesService } from '../../../../shared/services/listas.service';
import { Item } from 'angular2-multiselect-dropdown';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { round } from 'd3';
import { EvaluacionPlatoModel } from '../../model/evaluacion-plato.model';
import { EvaluacionPlatoService } from '../../service/evaluacion-plato.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-evaluacion-plato',
  templateUrl: './evaluacion-plato.component.html',
  styleUrls: ['./evaluacion-plato.component.scss'],
  providers: [EvaluacionPlatoService, ListasComunesService]
})
export class EvaluacionPlatoComponent implements OnInit {
  stateCtrl = new FormControl();

  // Configuracion del Completer
  dropdownList = [];
  dropdownListAlumno = [];
  selectedItems = [];
  selectedItemsAlumno = [];
  dropdownSettings = {};
  dropdownSettingsAlumno = {};

  // Eventos de Seleccion del Completer
  onItemSelect(item: any) {
    console.log(item);
    this._evaluacionPlatoModel.idPlato = item.id;
  }

  onItemSelectAlumno(item: any) {
    console.log(item);
    this._evaluacionPlatoModel.idAlumno = item.id;
  }

  // Json de Recepcion de los Datos
  public JsonReceptionPlatos: any;
  public JsonReceptionAlumnos: any;


  // Datos Iniciales de la Forma
  chefEvaluador: any;

  // Modelo de la Clase
  public _evaluacionPlatoModel: EvaluacionPlatoModel;


  /**
   * Seccion de Planificar los validadores
   */
  presentacionObs = new FormControl('', [
    // Validators.required,
  ]);

  presentacionNota = new FormControl('', [
    // Validators.required,
  ]);

  saborObs = new FormControl('', [
    // Validators.required,
  ]);

  saborNota = new FormControl('', [
    // Validators.required,
  ]);
  
  otrosObs = new FormControl('', [
    // Validators.required,
  ]);

  otrosNota = new FormControl('', [
    // Validators.required,
  ]);

  correctoUniformeObs = new FormControl('', [
    // Validators.required,
  ]);

  correctoUniformeNota = new FormControl('', [
    // Validators.required,
  ]);

  fechaEvaluacion = new FormControl('', [
    Validators.required,
  ]);

  idPlato = new FormControl('', [
    Validators.required,
  ]);

  idAlumno = new FormControl('', [
    // Validators.required,
  ]);

  // Identity
  public datosLocales: any;
  public datosLocalesToken: any;

  // Variables de mostrar Datos de la tabla
  public showData: boolean = false;

  /**
   * Constructor de la Clase
   * @param _evaluacionesService 
   */
  constructor(public _evaluacionPlatoService: EvaluacionPlatoService,
    public _listasComunesService: ListasComunesService,
    public _alumnoService: AlumnoService,
    public snackBar: MatSnackBar) {
  }

  /**
   * ngOnInit() 
   */
  ngOnInit() {
    // Asignacion de los Datos
    this.datosLocales = JSON.parse(localStorage.getItem('identity'));
    this.datosLocalesToken = localStorage.getItem('token');

    this.chefEvaluador = this.datosLocales.nombre + ', ' + this.datosLocales.apellido + ' ID: ' + this.datosLocales.codUser;

    // Setea el Intructor
    // this._evaluacionesModel.idInstructor = datosLocales.sub;

    // Seteo del Modelo
    this._evaluacionPlatoModel = new EvaluacionPlatoModel(
      0, '', // Identificacion
      0, null, 0, 0, // Relaciones
      null, 0, null, 0, null, null,
      null, null, 0, // Auditoria
    );

    // Datos de la Consulta
    this.getlistaPlatos();
    this.getlistaAlumnosEvaluar();

    this.selectedItems = [
    ];

    this.selectedItemsAlumno = [
    ];

    this.dropdownSettings = {
      singleSelection: true,
      text: "Selecciona el Plato a Evaluar",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'custom-class-example'
    };

    this.dropdownSettingsAlumno = {
      singleSelection: true,
      text: "Selecciona el Alumno a Evaluar",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'custom-class-example'
    };
  }

  /**
   * limpiarForma()
   */
  limpiarForma() {
    this.ngOnInit();
  }

  // Configuracion del Mensaje de Confirmacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /*****************************************************
    * Funcion: FND-00001.3
    * Fecha: 23-01-2019
    * Descripcion: Carga la Lista de Todas los Platos
    * Objetivo: Obtener la lista de Todas Platos
    * de la BD, Llamando a la API, por su metodo
    * ( all-list-platos ).
    ******************************************************/
  getlistaPlatos() {
    // Llamamos al Servicio que provee todos los Platos
    this._evaluacionPlatoService.platosViewAll().subscribe(
      response => {
        // platos/all-list-platos | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonReceptionPlatos = response.data;
          console.log(response.msg);
        } else {
          this.JsonReceptionPlatos = response.data;
          // Setea la Lista del Dropdown List
          this.dropdownList = this.JsonReceptionPlatos.map((item) => {
            return {
              id: item.idPlato,
              itemName: item.descripcionPlato,
              codPlato: item.codPlato,
            }
          })
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
        } else {
          console.log('Server-side error');
        }
      });
  } // FIN : FND-00001.3


  /*****************************************************
    * Funcion: FND-00001.4
    * Fecha: 23-01-2019
    * Descripcion: Carga la Lista de Todas los Alumnos,
    * que estan habilitados para Evaluar
    * Objetivo: Obtener la lista de Todas Platos
    * de la BD, Llamando a la API, por su metodo
    * ( alumnos/all-list-alumnos-evaluar ).
    ******************************************************/
  getlistaAlumnosEvaluar() {
    // Llamamos al Servicio que provee todos los Platos
    this._alumnoService.alumnoViewAll('').subscribe(
      response => {
        // platos/all-list-platos | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonReceptionAlumnos = response.data;
          console.log(response.msg);
        } else {
          this.JsonReceptionAlumnos = response.data;
          // Setea la Lista del Dropdown List
          this.dropdownListAlumno = this.JsonReceptionAlumnos.map((item) => {
            return {
              id: item.idAlumno,
              itemName: item.nombres + ' ' + item.apellidos + ' Email: ' + item.email + ' Celular: ' + item.celular,
              codAlumno: item.codAlumno,
            }
          })
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
        } else {
          console.log('Server-side error');
        }
      });
  } // FIN : FND-00001.4


  /*****************************************************
    * Funcion: FND-00001.5
    * Fecha: 23-01-2019
    * Descripcion: Graba la Evaluacion, con los Datos
    * Objetivo: Guardar los Datos de la Evaluacion
    * de la BD, Llamando a la API, por su metodo
    * ( alumnos/all-list-alumnos-evaluar ).
    ******************************************************/
  newEvaluacionCocinaPractica() {
    // Setea el Intructor
    this._evaluacionPlatoModel.idInstructor = this.datosLocales.sub;

    this.showData = true;

    if (this.validarForm() == 1) {
      // Regresamos al Formulario a completarlo
      // Ocultamos el Loader
      setTimeout(() => {
        this.showData = false;
      }, 3000);

      return -1;
    }

    // Calculo de las Notas
    this.notaFinal();

    console.log('Nota ' + this._evaluacionPlatoModel.notaFinal);

    // Llamamos al Servicio que provee todos los Platos
    this._evaluacionPlatoService.registerEvaluacionPlato(this._evaluacionPlatoModel, this.datosLocalesToken).subscribe(
      response => {
        // platos/all-list-platos | so redirect to return url
        if (response.code !== 200) {
          // Mensaje de alerta del error en cuestion          
          alert('Error ' + response.msg);
          this.showData = false;
        } else {
          // Setea la Lista del Dropdown List
          this.limpiarForma();
          alert('Evaluacion de Cocina Registrada ' + response.msg);
          this.showData = false;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error' + err.message);
        } else {
          console.log('Server-side error' + err.message);
        }
      });
  }


  /*****************************************************
    * Funcion: FND-00003.1
    * Fecha: 27-12-2018
    * Descripcion: Validacion del Formulario
    * Objetivo: Validar los campos del Formulario
    * (  ).
    ******************************************************/
  validarForm() {
    // Inicio de las validaciones
    if ((this._evaluacionPlatoModel.idInstructor === 0 || this._evaluacionPlatoModel.idInstructor === null)) {
      this.openSnackBar('Falta Ingresar el Instructor', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionPlatoModel.idPlato === 0 || this._evaluacionPlatoModel.idPlato === null)) {
      this.openSnackBar('Falta Ingresar el Plato a Evaluar', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionPlatoModel.idAlumno === 0 || this._evaluacionPlatoModel.idAlumno === null)) {
      this.openSnackBar('Falta Ingresar el Alumno', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionPlatoModel.presentacionNota === null || this._evaluacionPlatoModel.presentacionNota === 0 || this._evaluacionPlatoModel.presentacionNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Presentacion, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionPlatoModel.otrosNota === null || this._evaluacionPlatoModel.otrosNota === 0 || this._evaluacionPlatoModel.otrosNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de otros, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionPlatoModel.saborNota === null || this._evaluacionPlatoModel.saborNota === 0 || this._evaluacionPlatoModel.saborNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Limpieza, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    }

    // Retorna 0 cuando todo esta bien
    return 0;
  }

  /**
   * Calculo de Nota Final
   */
  notaFinal() {
    // Calculo de Notas
    const presentacionNota: number = this._evaluacionPlatoModel.presentacionNota;
    const saborNota: number = this._evaluacionPlatoModel.saborNota;
    const otrosNota: number = this._evaluacionPlatoModel.otrosNota;

    const sumaNota: number = Number(presentacionNota) + Number(saborNota) + Number(otrosNota);

    console.log('Sumatoria de notas ' + sumaNota);
    // Asignacion del Total
    this._evaluacionPlatoModel.notaFinal = Math.floor((sumaNota / 3) * 100) / 100;
    console.log('Nota Final ' + this._evaluacionPlatoModel.notaFinal);
  }

}
