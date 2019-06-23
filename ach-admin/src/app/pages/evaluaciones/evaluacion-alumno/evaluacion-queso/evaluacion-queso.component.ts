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
import { EvaluacionQuesoModel } from '../../model/evaluacion-queso.model';
import { EvaluacionQuesoService } from '../../service/evaluacion-queso.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-evaluacion-queso',
  templateUrl: './evaluacion-queso.component.html',
  styleUrls: ['./evaluacion-queso.component.scss'],
  providers: [EvaluacionQuesoService, ListasComunesService]
})
export class EvaluacionQuesoComponent implements OnInit {
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
    this._evaluacionQuesoModel.idPlato = item.id;
  }

  onItemSelectAlumno(item: any) {
    console.log(item);
    this._evaluacionQuesoModel.idAlumno = item.id;
  }

  // Json de Recepcion de los Datos
  public JsonReceptionQueso: any;
  public JsonReceptionAlumnos: any;


  // Datos Iniciales de la Forma
  chefEvaluador: any;

  // Modelo de la Clase
  public _evaluacionQuesoModel: EvaluacionQuesoModel;


  /**
   * Seccion de Planificar los validadores
   */
  presentacionObs = new FormControl('', [
    // Validators.required,
  ]);

  presentacionNota = new FormControl('', [
    // Validators.required,
  ]);

  conocimientoTemaObs = new FormControl('', [
    // Validators.required,
  ]);

  conocimientoTemaNota = new FormControl('', [
    // Validators.required,
  ]);

  reporteEscritoObs = new FormControl('', [
    // Validators.required,
  ]);

  reporteEscritoNota = new FormControl('', [
    // Validators.required,
  ]);

  uniformeObs = new FormControl('', [
    // Validators.required,
  ]);

  uniformeNota = new FormControl('', [
    // Validators.required,
  ]);

  degustacionObs = new FormControl('', [
    // Validators.required,
  ]);

  degustacionNota = new FormControl('', [
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
  constructor(public _evaluacionQuesoService: EvaluacionQuesoService,
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
    this._evaluacionQuesoModel = new EvaluacionQuesoModel(
      0, '', // Identificacion
      0, null, 0, 0, // Relaciones
      null, 0, null, 0, null, 0, null, 0, null, 0, // Evaluaciones
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
    this._evaluacionQuesoService.platosViewAll().subscribe(
      response => {
        // platos/all-list-platos | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonReceptionQueso = response.data;
          console.log(response.msg);
        } else {
          this.JsonReceptionQueso = response.data;
          // Setea la Lista del Dropdown List
          this.dropdownList = this.JsonReceptionQueso.map((item) => {
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
    this._evaluacionQuesoModel.idInstructor = this.datosLocales.sub;

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

    console.log('Nota ' + this._evaluacionQuesoModel.notaFinal);

    // Llamamos al Servicio que provee todos los Platos
    this._evaluacionQuesoService.registerEvaluacionQueso(this._evaluacionQuesoModel, this.datosLocalesToken).subscribe(
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
    if ((this._evaluacionQuesoModel.idInstructor === 0 || this._evaluacionQuesoModel.idInstructor === null)) {
      this.openSnackBar('Falta Ingresar el Instructor', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.idPlato === 0 || this._evaluacionQuesoModel.idPlato === null)) {
      this.openSnackBar('Falta Ingresar el Plato a Evaluar', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.idAlumno === 0 || this._evaluacionQuesoModel.idAlumno === null)) {
      this.openSnackBar('Falta Ingresar el Alumno', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.presentacionNota === null || this._evaluacionQuesoModel.presentacionNota === 0 || this._evaluacionQuesoModel.presentacionNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Presentacion, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.conocimientoTemaNota === null || this._evaluacionQuesoModel.conocimientoTemaNota === 0 || this._evaluacionQuesoModel.conocimientoTemaNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Conocimiento del Tema, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.reporteEscritoNota === null || this._evaluacionQuesoModel.reporteEscritoNota === 0 || this._evaluacionQuesoModel.reporteEscritoNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Reporte Escritorio, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.uniformeNota === null || this._evaluacionQuesoModel.uniformeNota === 0 || this._evaluacionQuesoModel.uniformeNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Uniforme, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionQuesoModel.degustacionNota === null || this._evaluacionQuesoModel.degustacionNota === 0 || this._evaluacionQuesoModel.degustacionNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Degustacion, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
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
    const presentacionNota: number = this._evaluacionQuesoModel.presentacionNota;
    const conocimientoNota: number = this._evaluacionQuesoModel.conocimientoTemaNota;
    const reporteNota: number = this._evaluacionQuesoModel.reporteEscritoNota;
    const uniformeNota: number = this._evaluacionQuesoModel.uniformeNota;
    const degustacionNota: number = this._evaluacionQuesoModel.degustacionNota;

    const sumaNota: number = Number(presentacionNota) + Number(conocimientoNota) + Number(reporteNota) + 
    Number(uniformeNota) + Number(degustacionNota);

    console.log('Sumatoria de notas ' + sumaNota);
    // Asignacion del Total
    this._evaluacionQuesoModel.notaFinal = Math.floor((sumaNota / 5) * 100) / 100;
    console.log('Nota Final ' + this._evaluacionQuesoModel.notaFinal);
  }


}
