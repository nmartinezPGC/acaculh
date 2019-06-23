import { Component, OnInit, ViewChild } from '@angular/core';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { ConsultaAlumnoService } from '../../consultas/service/consulta.service.service';
import { EvaluacionNotaTeoricaService } from '../service/evaluacion-nota-teorica.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EvaluacionNotaTeoricaModel } from '../model/evaluacion-nota-teorica.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-nota-teorica',
  templateUrl: './evaluacion-nota-teorica.component.html',
  styleUrls: ['./evaluacion-nota-teorica.component.scss'],
  providers: [ListasComunesService, ConsultaAlumnoService, EvaluacionNotaTeoricaService],
})
export class EvaluacionNotaTeoricaComponent implements OnInit {
  // Configuracion de las Columnas
  displayedColumns = ['idAlumno', 'codAlumno', 'nombres', 'apellidos',
    'celular', 'email', 'actions'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetAllListAlumnos: any[];
  public JsonOutgetAllListAlumnosSend: any[];

  // Variables de mostrar Datos de la tabla
  public showData: boolean = true;
  public showData2: boolean = false;

  // Datos a enviar al Formulario
  public idAlumnoSend: number;
  public codAlumnoSend: string;
  public nombresSend: string;
  public apellidosSend: string;
  public celularSend: number;

  // Variables tipo Json de Listas
  public JsonOutgetlistaInstructor: any[];

  public _evaluacionNotaTeoricaModel: EvaluacionNotaTeoricaModel;

  /**
  * Variables FormControl
  */
  idAlumno = new FormControl('', [
    // Validators.required,
  ]);

  idInstructor = new FormControl('', [
    // Validators.required,
  ]);

  notaTeorica = new FormControl('', [
    // Validators.required,
  ]);

  observaciones = new FormControl('', [
    // Validators.required,
  ]);

  notaExamen = new FormControl('', [
    // Validators.required,
  ]);

  /**
  * Constructor de la Clase
  * @param _listasComunes
  * @param _consultaAlumnoServices
  * @param _snackBar
  */
  constructor(private _listasComunes: ListasComunesService,
    private _consultaAlumnoServices: ConsultaAlumnoService,
    private _evaluacionNotaTeoricaService: EvaluacionNotaTeoricaService,
    public _snackBar: MatSnackBar) {

    // Iniciamos las Listas Comunes
    this.getAllListAlumnos();

    // console.log(this.JsonOutgetAllListAlumnos);
    this.dataSource = new MatTableDataSource(this.JsonOutgetAllListAlumnos);
  }


  /**
  * Funcion de Mensajes en Pantall
  * @param message
  * @param action
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /**
  * Clase Inicial del Componente
  */
  ngOnInit() {
    // Definicion de la Insercion de los Datos de Nueva Comunicacion
    this._evaluacionNotaTeoricaModel = new EvaluacionNotaTeoricaModel(
      0, '', // Identificacion Nota
      0, null, null, null, 0, // Identificacion Alumno
      0, null, null, // Relaciones de Tablas
      null, null,
    );

    // Limpia los campos

    // Ejecutamos las Listas
    this.getlistaInstructores();
    // this.getlistaTiposPagoAll();
  }

  /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 24-12-2018
  * Descripcion: Carga la Lista de todos los Alumnos
  * Objetivo: Obtener la lista de Todos los Alumnos
  * de la BD, Llamando a la API, por su metodo
  * ( alumno/all-list-alumnos ).
  ******************************************************/
  getAllListAlumnos() {
    // Mostramos el Loader
    this.showData = true;

    // Llamamos al Servicio que provee todos los Alumnos ACH
    this._consultaAlumnoServices.getAllAlumnos().subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListAlumnos = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
          this.showData = false;
        } else {
          this.JsonOutgetAllListAlumnos = response.data;
          this.dataSource = new MatTableDataSource(this.JsonOutgetAllListAlumnos);

          // Paginador de la Tabla
          this.ngAfterViewInit();

          this.showData = false;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00001


  /*****************************************************
    * Funcion: FND-00002
    * Fecha: 12-02-2018
    * Descripcion: Carga la Lista de Instructores
    * Objetivo: Obtener la lista de Instructores
    * de la BD, Llamando a la API, por su metodo
    * ( instrutor-all-list ).
    ******************************************************/
  getlistaInstructores() {
    // Llamamos al Servicio que provee todas los Instructores
    this._listasComunes.listasComunes('', 'instrutor-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaInstructor = response.data;

          this.openSnackBar(response.msg, 'Error al obtener la informacion de Instructores');
        } else {
          this.JsonOutgetlistaInstructor = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00002


  /*****************************************************
    * Funcion: FND-00002
    * Fecha: 28-12-2018
    * Descripcion: Envia los Datos al Formulario para
    * procesar el Pago asociado al Alumno
    * Objetivo: Envia los Datos al Formulario
    ******************************************************/
  sendDataForm(idAlumnoIn: number, codAlumnoIn: string,
    nombresIn: string, apellidosIn: string, celularIn: number, emailIn: string) {
    // Seteamos los valores a los campos del Formulario
    this.nombresSend = nombresIn;
    this.apellidosSend = apellidosIn;
    this.celularSend = celularIn;
    this.codAlumnoSend = codAlumnoIn;

    // Seteamos los Valores del Json a Enviar
    this._evaluacionNotaTeoricaModel.idAlumno = idAlumnoIn;
    this._evaluacionNotaTeoricaModel.codAlumno = codAlumnoIn;
    this._evaluacionNotaTeoricaModel.nombres = nombresIn;
    this._evaluacionNotaTeoricaModel.apellidos = apellidosIn;
    // this._evaluacionNotaTeoricaModel.email = emailIn;
    // this._evaluacionNotaTeoricaModel.celular = celularIn;
    // console.log(this._evaluacionNotaTeoricaModel.email);
    // this.openSnackBar('Prueba de Boton de tabla : ' + nombresIn + ' ' + apellidosIn, 'Server-side error');
  }// FIN : FND-00002

  /*****************************************************
    * Funcion: FND-00006
    * Fecha: 31-12-2018
    * Descripcion: Inicializacion del Formulario
    * Objetivo: Inicializa los campos del Formulario
    * (  ).
    ******************************************************/
  initForm() {
    this.ngOnInit();

    // Limpia los Campos
    this.codAlumnoSend = null;
    this.idAlumnoSend = null;
    this.nombresSend = null;
    this.apellidosSend = null;
    this.celularSend = null;
  }


  /*****************************************************
    * Funcion: FND-00006
    * Fecha: 22-12-2018
    * Descripcion: Cargar Imagen
    * Objetivo: Cargar Imagen
    ******************************************************/
  public respuestaImagenEnviada;
  public resultadoCarga;

  public cargandoImagen(files: FileList) {
    const nombreFile: string = files[0].name;
    this._evaluacionNotaTeoricaModel.urlDocumentoNota = nombreFile;

    // Valida que el Codigo del Alumno se ha Oingresado y Granbado
    if (this._evaluacionNotaTeoricaModel.idInstructor === null) {
      this.openSnackBar('Error al cargar el Archivo', 'Debes de Ingresar los Datos del Alumno');
      return -1;
    }
    const token1 = this._evaluacionNotaTeoricaService.getToken();

    this._evaluacionNotaTeoricaService.postFileImagen(token1, files[0], this._evaluacionNotaTeoricaModel.codAlumno).subscribe(

      response => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {

          if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success") {
            this.resultadoCarga = 1;
            // this.openSnackBar('Arhivo cargado exitosamente', this.respuestaImagenEnviada.msg);
          } else {
            this.resultadoCarga = 2;
            this.openSnackBar('Error al cargar el Archivo', this.respuestaImagenEnviada.msg);
            return 1;
          }

        }
      },
      error => {
        console.log(<any>error);
      }

    );//FIN DE METODO SUBSCRIBE

  }

  /**
   * Save Nota Teorica
   */
  saveNotaTeorica() {
    console.log(this._evaluacionNotaTeoricaModel);
    // Valida que el Codigo del Alumno se ha Oingresado y Granbado
    if (this._evaluacionNotaTeoricaModel.idAlumno === null || this._evaluacionNotaTeoricaModel.idAlumno === 0) {
      this.openSnackBar('Error al ingresar Nota Teorica', 'Debes de Ingresar los Datos del Alumno');
      return -1;
    }
    const token1 = this._evaluacionNotaTeoricaService.getToken();

    this._evaluacionNotaTeoricaService.registerEvaluacionNotaTeorica(token1, this._evaluacionNotaTeoricaModel).subscribe(

      response => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {

          if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success") {
            this.resultadoCarga = 1;
            this.openSnackBar('Nota Teorica Ingresada exitosamente', this.respuestaImagenEnviada.msg);
            this.initForm();
          } else {
            this.resultadoCarga = 2;
            this.openSnackBar('Error al ingresar la nota teorica', this.respuestaImagenEnviada.msg);
            return 1;
          }
        }
      },
      error => {
        console.log(<any>error);
      }

    );//FIN DE METODO SUBSCRIBE
  }

}

/**
 * Definicion de la Interface de los Datos
 * Se incluye los Campos que se visualizaran en la Tabla
 */
export interface UserData {
  // Propiedades de las Clase
  idAlumno: number;
  codAlumno: string;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  celular: number;
  direccion: string;
  medioConoceAch: string;
  descTipoBeca: string;
  montoPago: number;
  email: string;
}

