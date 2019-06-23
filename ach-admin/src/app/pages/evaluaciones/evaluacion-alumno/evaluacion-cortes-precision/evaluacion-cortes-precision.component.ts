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
import { EvaluacionCortesPrecisionModel } from '../../model/evaluacion-cortes-precision.model';
import { EvaluacionCortesPrecisionService } from '../../service/evaluacion-cortes-precision.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-evaluacion-cortes-precision',
  templateUrl: './evaluacion-cortes-precision.component.html',
  styleUrls: ['./evaluacion-cortes-precision.component.scss'],
  providers: [EvaluacionCortesPrecisionService, ListasComunesService]
})
export class EvaluacionCortesPrecisionComponent implements OnInit {

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
    this._evaluacionCortesPrecisionModel.idPlato = item.id;
  }

  onItemSelectAlumno(item: any) {
    console.log(item);
    this._evaluacionCortesPrecisionModel.idAlumno = item.id;
  }

  // Json de Recepcion de los Datos
  public JsonReceptionPlatos: any;
  public JsonReceptionAlumnos: any;


  // Datos Iniciales de la Forma
  chefEvaluador: any;

  // Modelo de la Clase
  public _evaluacionCortesPrecisionModel: EvaluacionCortesPrecisionModel;


  /**
   * Seccion de Planificar los validadores
   */
  higieneGeneralObs = new FormControl('', [
    // Validators.required,
  ]);

  higieneGeneralNota = new FormControl('', [
    // Validators.required,
  ]);

  correctoUniformeObs = new FormControl('', [
    // Validators.required,
  ]);

  correctoUniformeNota = new FormControl('', [
    // Validators.required,
  ]);

  filoCuchilloObs = new FormControl('', [
    // Validators.required,
  ]);

  filoCuchilloNota = new FormControl('', [
    // Validators.required,
  ]);

  tecnicaCuchilloObs = new FormControl('', [
    // Validators.required,
  ]);

  tecnicaCuchilloNota = new FormControl('', [
    // Validators.required,
  ]);

  medidasCortesObs = new FormControl('', [
    // Validators.required,
  ]);

  medidasCortesNota = new FormControl('', [
    // Validators.required,
  ]);

  tecnicapesoCorteObs = new FormControl('', [
    // Validators.required,
  ]);

  tecnicapesoCorteNota = new FormControl('', [
    // Validators.required,
  ]);

  limpiezaObs = new FormControl('', [
    // Validators.required,
  ]);

  limpiezaNota = new FormControl('', [
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
  constructor(public _evaluacionCortesPrecisionService: EvaluacionCortesPrecisionService,
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
    this._evaluacionCortesPrecisionModel = new EvaluacionCortesPrecisionModel(
      0, '', // Identificacion
      0, null, 0, 0, // Relaciones
      '', 0, '', 0, // Higiene
      '', 0, // Uniforme
      '', 0, '', 0, // Uso de Cuchillos
      '', 0, // Medidas
      '', 0, // Peso
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
    this._evaluacionCortesPrecisionService.platosViewAll().subscribe(
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
    this._evaluacionCortesPrecisionModel.idInstructor = this.datosLocales.sub;

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

    console.log('Nota ' + this._evaluacionCortesPrecisionModel.notaFinal);

    // Llamamos al Servicio que provee todos los Platos
    this._evaluacionCortesPrecisionService.registerEvaluacionCortesPrecision(this._evaluacionCortesPrecisionModel, this.datosLocalesToken).subscribe(
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
    if ((this._evaluacionCortesPrecisionModel.idInstructor === 0 || this._evaluacionCortesPrecisionModel.idInstructor === null)) {
      this.openSnackBar('Falta Ingresar el Instructor', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.idPlato === 0 || this._evaluacionCortesPrecisionModel.idPlato === null)) {
      this.openSnackBar('Falta Ingresar el Plato a Evaluar', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.idAlumno === 0 || this._evaluacionCortesPrecisionModel.idAlumno === null)) {
      this.openSnackBar('Falta Ingresar el Alumno', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.higieneGeneralNota === null || this._evaluacionCortesPrecisionModel.higieneGeneralNota === 0 || this._evaluacionCortesPrecisionModel.higieneGeneralNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Higiene General, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.correctoUniformeNota === null || this._evaluacionCortesPrecisionModel.correctoUniformeNota === 0 || this._evaluacionCortesPrecisionModel.correctoUniformeNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Correcto Uniforme, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.filoCuchilloNota === null || this._evaluacionCortesPrecisionModel.filoCuchilloNota === 0 || this._evaluacionCortesPrecisionModel.filoCuchilloNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Filo de Cuchillo, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.tecnicaCuchilloNota === null || this._evaluacionCortesPrecisionModel.tecnicaCuchilloNota === 0 || this._evaluacionCortesPrecisionModel.tecnicaCuchilloNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Tecnica de Cuchillo, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.medidasCortesNota === null || this._evaluacionCortesPrecisionModel.medidasCortesNota === 0 || this._evaluacionCortesPrecisionModel.medidasCortesNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Medidas Cortes, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.tecnicapesoCorteObs === null || this._evaluacionCortesPrecisionModel.tecnicapesoCorteNota === 0 || this._evaluacionCortesPrecisionModel.tecnicapesoCorteNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Tecnica de Peso, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionCortesPrecisionModel.limpiezaNota === null || this._evaluacionCortesPrecisionModel.limpiezaNota === 0 || this._evaluacionCortesPrecisionModel.limpiezaNota > 100)) {
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
    const higieneGeneralNotaVal: number = this._evaluacionCortesPrecisionModel.higieneGeneralNota;
    const correctoUniformenotaVal: number = this._evaluacionCortesPrecisionModel.correctoUniformeNota;
    const filoCuchilloNota: number = this._evaluacionCortesPrecisionModel.filoCuchilloNota;
    const tecnicaCuchilloNota: number = this._evaluacionCortesPrecisionModel.tecnicaCuchilloNota;
    const medidasCortesNota: number = this._evaluacionCortesPrecisionModel.medidasCortesNota;
    const tecnicapesoCorteNota: number = this._evaluacionCortesPrecisionModel.tecnicapesoCorteNota;
    
    const sumaNota: number = Number(higieneGeneralNotaVal) + Number(correctoUniformenotaVal) + Number(filoCuchilloNota) + Number(tecnicaCuchilloNota) + Number(tecnicapesoCorteNota) +
      Number(medidasCortesNota);

    console.log('Sumatoria de notas ' + sumaNota);
    // Asignacion del Total
    this._evaluacionCortesPrecisionModel.notaFinal = Math.floor((sumaNota / 6) * 100) / 100;
    console.log('Nota Final ' + this._evaluacionCortesPrecisionModel.notaFinal);
  }

}
