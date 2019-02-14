import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EvaluacionesService } from '../../service/evaluacion-practica.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { EvaluacionesModel } from '../../model/evaluaciones.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ListasComunesService } from '../../../../shared/services/listas.service';
import { Item } from 'angular2-multiselect-dropdown';
import { AlumnoService } from '../../../alumno/service/alumno.service';
import { round } from 'd3';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-evaluacion-cocina-practica',
  templateUrl: './evaluacion-cocina-practica.component.html',
  styleUrls: ['./evaluacion-cocina-practica.component.scss'],
  providers: [EvaluacionesService, ListasComunesService]
})
export class EvaluacionCocinaPracticaComponent implements OnInit {
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
    this._evaluacionesModel.idPlato = item.id;
  }

  onItemSelectAlumno(item: any) {
    console.log(item);
    this._evaluacionesModel.idAlumno = item.id;
  }

  // Json de Recepcion de los Datos
  public JsonReceptionPlatos: any;
  public JsonReceptionAlumnos: any;


  // Datos Iniciales de la Forma
  chefEvaluador: any;

  // Modelo de la Clase
  public _evaluacionesModel: EvaluacionesModel;


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

  correctoUniformenota = new FormControl('', [
    // Validators.required,
  ]);

  horaEntregaObs = new FormControl('', [
    // Validators.required,
  ]);

  horaEntregaNota = new FormControl('', [
    // Validators.required,
  ]);

  flujoTrabajoObs = new FormControl('', [
    // Validators.required,
  ]);

  flujoTrabajoNota = new FormControl('', [
    // Validators.required,
  ]);

  saborObs = new FormControl('', [
    // Validators.required,
  ]);

  saborNota = new FormControl('', [
    // Validators.required,
  ]);

  texturaObs = new FormControl('', [
    // Validators.required,
  ]);

  texturaNota = new FormControl('', [
    // Validators.required,
  ]);

  tecnicaObs = new FormControl('', [
    // Validators.required,
  ]);

  tecnicaNota = new FormControl('', [
    // Validators.required,
  ]);

  limpiezaObs = new FormControl('', [
    // Validators.required,
  ]);

  limpiezaNota = new FormControl('', [
    // Validators.required,
  ]);

  armadoObs = new FormControl('', [
    // Validators.required,
  ]);

  armadoNota = new FormControl('', [
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
  constructor(public _evaluacionesService: EvaluacionesService,
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
    this._evaluacionesModel = new EvaluacionesModel(
      0, '', // Identificacion
      0, null, 0, 0, // Relaciones
      '', 0, '', 0, // Higiene
      '', 0, '', 0, // Organizacion
      '', 0, '', 0, // Preparacion
      '', 0, // Tecnica
      '', 0, '', 0, // Presentacion
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
    this._evaluacionesService.platosViewAll().subscribe(
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
    this._evaluacionesModel.idInstructor = this.datosLocales.sub;

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

    console.log('Nota ' + this._evaluacionesModel.notaFinal);

    // Llamamos al Servicio que provee todos los Platos
    this._evaluacionesService.registerEvaluacionCocinaPractia(this._evaluacionesModel, this.datosLocalesToken).subscribe(
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
    if ((this._evaluacionesModel.idInstructor === 0 || this._evaluacionesModel.idInstructor === null)) {
      this.openSnackBar('Falta Ingresar el Instructor', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.idPlato === 0 || this._evaluacionesModel.idPlato === null)) {
      this.openSnackBar('Falta Ingresar el Plato a Evaluar', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.idAlumno === 0 || this._evaluacionesModel.idAlumno === null)) {
      this.openSnackBar('Falta Ingresar el Alumno', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.higieneGeneralNota === null || this._evaluacionesModel.higieneGeneralNota === 0 || this._evaluacionesModel.higieneGeneralNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Higiene General, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.correctoUniformenota === null || this._evaluacionesModel.correctoUniformenota === 0 || this._evaluacionesModel.correctoUniformenota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Correcto Uniformeo, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.horaEntregaNota === null || this._evaluacionesModel.horaEntregaNota === 0 || this._evaluacionesModel.horaEntregaNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Hora de Entrega, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.flujoTrabajoNota === null || this._evaluacionesModel.flujoTrabajoNota === 0 || this._evaluacionesModel.flujoTrabajoNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Flujo de Trabajo, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.saborNota === null || this._evaluacionesModel.saborNota === 0 || this._evaluacionesModel.saborNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Sabor, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.texturaNota === null || this._evaluacionesModel.texturaNota === 0 || this._evaluacionesModel.texturaNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Textura, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.tecnicaNota === null || this._evaluacionesModel.tecnicaNota === 0 || this._evaluacionesModel.tecnicaNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Tecnica, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.limpiezaNota === null || this._evaluacionesModel.limpiezaNota === 0 || this._evaluacionesModel.limpiezaNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Limpieza, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
      return 1;
    } else if ((this._evaluacionesModel.armadoNota === null || this._evaluacionesModel.armadoNota === 0 || this._evaluacionesModel.armadoNota > 100)) {
      this.openSnackBar('Falta Ingresar la Nota de Armado, o sobrepasa de 100%', 'Error al ingresar la Evaluacion');
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
    const higieneGeneralNotaVal: number = this._evaluacionesModel.higieneGeneralNota;
    const correctoUniformenotaVal: number = this._evaluacionesModel.correctoUniformenota;
    const horaEntregaNotaVal: number = this._evaluacionesModel.horaEntregaNota;
    const flujoTrabajoNotaVal: number = this._evaluacionesModel.flujoTrabajoNota;
    const saborNotaVal: number = this._evaluacionesModel.saborNota;
    const texturaNotaVal: number = this._evaluacionesModel.texturaNota;
    const tecnicaNotaVal: number = this._evaluacionesModel.tecnicaNota;
    const limpiezaNotaVal: number = this._evaluacionesModel.limpiezaNota;
    const armadoNotaVal: number = this._evaluacionesModel.armadoNota;

    const sumaNota: number = Number(higieneGeneralNotaVal) + Number(correctoUniformenotaVal) + Number(horaEntregaNotaVal) + Number(flujoTrabajoNotaVal) + Number(saborNotaVal) +
      Number(texturaNotaVal) + Number(tecnicaNotaVal) + Number(limpiezaNotaVal) + Number(armadoNotaVal);

    console.log('Sumatoria de notas ' + sumaNota);
    // Asignacion del Total
    this._evaluacionesModel.notaFinal = Math.floor((sumaNota / 9) * 100) / 100;
    console.log('Nota Final ' + this._evaluacionesModel.notaFinal);
  }

}
