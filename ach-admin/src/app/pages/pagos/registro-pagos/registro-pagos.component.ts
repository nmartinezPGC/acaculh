import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { ConsultaAlumnoService } from '../../consultas/service/consulta.service.service';
import { ConsultaAlumnoModel } from '../../consultas/model/consulta.alumno.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { RegistroPagosModel } from '../model/registro-pagos.model';
import { RegistroPagosService } from '../service/registro-pagos.service';

@Component({
  selector: 'app-registro-pagos',
  templateUrl: './registro-pagos.component.html',
  styleUrls: ['./registro-pagos.component.scss'],
  providers: [ListasComunesService, ConsultaAlumnoService, RegistroPagosService],
})
export class RegistroPagosComponent implements OnInit {
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

  public _consultaAlumnoModel: ConsultaAlumnoModel;

  // Variables de mostrar Datos de la tabla
  public showData: boolean = true;

  // Datos a enviar al Formulario
  public idAlumnoSend: number;
  public codAlumnoSend: string;
  public nombresSend: string;
  public apellidosSend: string;
  public celularSend: number;

  // Variables tipo Json de Listas
  public JsonOutgetlistaFormasPago: any[];
  public JsonOutgetlistaTiposPago: any[];

  public _registroPagosModel: RegistroPagosModel;

  /**
   * Variables FormControl
   */
  idFormaPago = new FormControl('', [
    // Validators.required,
  ]);

  idTipoPago = new FormControl('', [
    // Validators.required,
  ]);

  montoPago = new FormControl('', [
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
    public _snackBar: MatSnackBar,
    public _registroPagosService: RegistroPagosService ) {

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
    this._registroPagosModel = new RegistroPagosModel(
      0, '', null, null, '', null, // Identificacion Pago
      0, '', '', '', '', '', // Identificacion Alumno
      3, '', 0, '', 0, '', 0 // Relaciones de Tablas
    );

    // Ejecutamos las Listas
    this.getlistaFormasPagoAll();
    this.getlistaTiposPagoAll();
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
          this.openSnackBar(response.msg, 'Error al obtener la informacion de los Alumnos resgitrados en la BD');
        } else {
          this.JsonOutgetAllListAlumnos = response.data;
          console.log(this.JsonOutgetAllListAlumnos);
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
    this._registroPagosModel.idAlumno = idAlumnoIn;
    this._registroPagosModel.codAlumno = codAlumnoIn;
    this._registroPagosModel.nombres = nombresIn;
    this._registroPagosModel.apellidos = apellidosIn;
    this._registroPagosModel.email = emailIn;
    // this.openSnackBar('Prueba de Boton de tabla : ' + nombresIn + ' ' + apellidosIn, 'Server-side error');
  }// FIN : FND-00002


  /*****************************************************
    * Funcion: FND-00003
    * Fecha: 25-12-2018
    * Descripcion: Carga la Lista de las Formas de Pago ACH
    * Objetivo: Obtener la lista de Todas las Formas de Pago ACH
    * de la BD, Llamando a la API, por su metodo
    * ( forma-pago-all-list ).
    ******************************************************/
  getlistaFormasPagoAll() {
    // Llamamos al Servicio que provee todas las Formas de Pago ACH
    this._listasComunes.listasComunes('', 'forma-pago-all-list').subscribe(
      response => {
        // listas/forma-pago-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaFormasPago = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Formas de Pago');
        } else {
          this.JsonOutgetlistaFormasPago = response.data;
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
  } // FIN : FND-00003


  /*****************************************************
    * Funcion: FND-00003
    * Fecha: 25-12-2018
    * Descripcion: Carga la Lista de las Formas de Pago ACH
    * Objetivo: Obtener la lista de Todas las Formas de Pago ACH
    * de la BD, Llamando a la API, por su metodo
    * ( tipo-pago-all-list ).
    ******************************************************/
  getlistaTiposPagoAll() {
    // Llamamos al Servicio que provee todas los Tipos de Pago ACH
    this._listasComunes.listasComunes('', 'tipo-pago-all-list').subscribe(
      response => {
        // listas/tipo-pago-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaTiposPago = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Tipos de Pago');
        } else {
          this.JsonOutgetlistaTiposPago = response.data;
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
  } // FIN : FND-00003


  /*****************************************************
    * Funcion: FND-00004
    * Fecha: 30-12-2018
    * Descripcion: Ingresa Nuevo Pago registrado al Alumno
    * de la BD, Llamando a la API, por su metodo
    * ( pagos/new-pago-alumno ).
    ******************************************************/
  nuevoPagoAlumno() {
    // Prepara los datos a Enviar
    const token1 = this._registroPagosService.getToken();
    
    const identity = this._registroPagosService.getIdentity();
    
    // Id del Usuario que esta registrando
    const userInto = identity.sub;
    this._registroPagosModel.idUsuarioPago = userInto;
    // console.log(this._registroPagosModel);
  } // FIN : FND-00004


} // FIN Clase RegistroPagosComponent


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
