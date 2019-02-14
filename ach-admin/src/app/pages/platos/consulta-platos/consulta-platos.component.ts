import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ConsultaPlatosModel } from '../model/consulta-platos.model';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { RegistroPagosService } from '../../pagos/service/registro-pagos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistroPlatosService } from '../service/registro-platos.service';

@Component({
  selector: 'app-consulta-platos',
  templateUrl: './consulta-platos.component.html',
  styleUrls: ['./consulta-platos.component.scss'],
  providers: [ListasComunesService, RegistroPlatosService ]
})
export class ConsultaPlatosComponent implements OnInit {

  // Configuracion de las Columnas
  displayedColumns = ['idPlato', 'codPlato', 'nombrePlato', 'descripcionPlato', 'descTipoPlato', 'calificacionPlato', 'actions'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("calificacionPlato") calif: ElementRef;

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetAllListAlumnos: any[];
  public JsonOutgetAllListAlumnosSend: any[];

  // Variables de mostrar Datos de la tabla
  public showData: boolean = true;
  public showData2: boolean = false;

  // Datos a enviar al Formulario
  public idPlatoSend: number;
  public codPlatoSend: string;
  public nombrePlatoSend: string;
  public descPlatoSend: string;
  public idTipoPlatoSend: number;
  calificacionSend;

  selected = '';

  // Variables tipo Json de Listas
  public JsonOutgetlistaFormasPago: any[];
  public JsonOutgetlistaTiposPago: any[];

  public _consultaPlatosModel: ConsultaPlatosModel;

  public JsonOutgetlistaTipoPlatos: any;

  public JsonOutgetAllListPlatos: any;
  public JsonOutgetPlato: any;

  /**
  * Variables FormControl
  */
  idPlato = new FormControl('', [
    // Validators.required,
  ]);

  idTipoPlato = new FormControl('', [
    // Validators.required,
  ]);

  calificacionPlato = new FormControl('', [
    // Validators.required,
  ]);

  descripcionPlato = new FormControl('', [
    // Validators.required,
  ]);

  nombrePlato = new FormControl('', [
    // Validators.required,
  ]);

  codPlato = new FormControl('', [
    // Validators.required,
  ]);

  /**
  * Constructor de la Clase
  * @param _listasComunes
  * @param _consultaAlumnoServices
  * @param _snackBar
  */
  constructor(private _listasComunes: ListasComunesService,
    public _snackBar: MatSnackBar,
    public _registroPlatosService: RegistroPlatosService) {

    // Iniciamos las Listas Comunes
    this.getAllListPlatos();

    this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPlatos);
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
    this._consultaPlatosModel = new ConsultaPlatosModel(
      0, '', null, null, // Identificacion Plato
      0, 0, // Relaciones
      '0', // Califiacion
    );

    // Limpia los campos

    // Ejecutamos las Listas
    this.getAllListPlatos();
    this.getlistaTiposPlatos();
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
  getAllListPlatos() {
    // Mostramos el Loader
    this.showData = true;

    // Llamamos al Servicio que provee todos los Alumnos ACH
    this._registroPlatosService.platosViewAll().subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListPlatos = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
        } else {
          this.JsonOutgetAllListPlatos = response.data;
          console.log(this.JsonOutgetAllListPlatos);
          this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPlatos);

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
  sendDataForm(idPlatoIn: number, codPlatoIn: string,
    nombrePlatoIn: string, descPlatoIn: string, calificacionIn: number, idTipoPlatoIn: number,) {
    // Seteamos los valores a los campos del Formulario
    this.nombrePlatoSend = nombrePlatoIn;
    this.codPlatoSend = codPlatoIn;
    this.descPlatoSend = descPlatoIn;
    this.idTipoPlatoSend = idTipoPlatoIn;
    this.calificacionSend = String( calificacionIn);
    this.selected =  String( calificacionIn);

    // Seteamos los Valores del Json a Enviar
    this._consultaPlatosModel.idPlato = idPlatoIn;
    this._consultaPlatosModel.codPlato = codPlatoIn;
    this._consultaPlatosModel.nombrePlato = nombrePlatoIn;
    this._consultaPlatosModel.descripcionPlato = descPlatoIn;
    this._consultaPlatosModel.idTipoPlato = idTipoPlatoIn;
    this._consultaPlatosModel.calificacionPlato = this.selected;
    
    console.log('Row prinnt '+ JSON.stringify(this.selected ));
    // this.openSnackBar('Prueba de Boton de tabla : ' + nombresIn + ' ' + apellidosIn, 'Server-side error');
  }// FIN : FND-00002


  /*****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Carga la Lista de Todas Tipos Plato
  * Objetivo: Obtener la lista de Tipos Plato
  * de la BD, Llamando a la API, por su metodo
  * ( all-list-tipo-platos ).
  ******************************************************/
  getlistaTiposPlatos() {
    // Llamamos al Servicio que provee todas las Profesiones
    this._registroPlatosService.platosTipoViewAll('', 'all-list-tipo-platos').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaTipoPlatos = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
        } else {
          this.JsonOutgetlistaTipoPlatos = response.data;
          console.log(this.JsonOutgetlistaTipoPlatos);
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
  } // FIN : FND-00002


  /*****************************************************
  * Funcion: FND-00004
  * Fecha: 30-12-2018
  * Descripcion: Ingresa Nuevo Pago registrado al Alumno
  * de la BD, Llamando a la API, por su metodo
  * ( pagos/new-pago-alumno ).
  ******************************************************/
  nuevoPagoAlumno() {
    // Cargamos el Loader
    this.showData2 = true;

    // Validacion de los Datos Obligatorios
    /*if (this.validarForm() == 1) {
      // Regresamos al Formulario a completarlo
      // Ocultamos el Loader
      setTimeout(() => {
        this.showData2 = false;
      }, 3000);
      return -1;
    }*/

    // Prepara los datos a Enviar
    const token1 = this._registroPlatosService.getToken();
    const identity = this._registroPlatosService.getIdentity();

    this._consultaPlatosModel.calificacionPlato = this.selected;

    // Id del Usuario que esta registrando
    // const userInto = identity.sub;
    // this._consultaPlatosModel.idPlato = userInto;

    console.log('Modelo de la Clase ' + JSON.stringify( this._consultaPlatosModel));

    // Llamamos al Servicio que actualiza el Plato
    this._registroPlatosService.editPlato(this._consultaPlatosModel).subscribe(
      response => {
        // platos/edit-plato
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.openSnackBar(response.msg, 'Error al actualizar el Plato');
          // Ocultamos el Loader
          this.showData2 = false;
        } else {
          // Inicia el Formulario          
          this.openSnackBar(response.msg, 'Actualizacion de Plato con exito');
          // limpia el formulario
          this.initForm();

          // Ocultamos el Loader
          this.showData2 = false;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
          // Ocultamos el Loader
          this.showData2 = false;
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
          // Ocultamos el Loader
          this.showData2 = false;
        }
      });
    // console.log(this._registroPagosModel);
  } // FIN : FND-00004


  /*****************************************************
  * Funcion: FND-00005
  * Fecha: 27-12-2018
  * Descripcion: Validacion del Formulario
  * Objetivo: Validar los campos del Formulario
  * (  ).
  ******************************************************/
  /*validarForm() {
    if ((this._registroPagosModel.codAlumno == '' || this._registroPagosModel.codAlumno == null)) {
      this.openSnackBar('Falta Ingresar el Codigo del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._registroPagosModel.nombres == '' || this._registroPagosModel.apellidos == '')) {
      this.openSnackBar('Falta Ingresar los Nombres y Apellidos del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._registroPagosModel.montoPago == 0 || this._registroPagosModel.montoPago == null)) {
      this.openSnackBar('Falta Ingresar El Monto del Pago', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._registroPagosModel.idTipoPago == 0 || this._registroPagosModel.idTipoPago == null)) {
      this.openSnackBar('Falta Ingresar el Tipo de Pago', 'Error al ingresar el Pago de Alumno');
      return 1;
    } else if ((this._registroPagosModel.idFormaPago == 0 || this._registroPagosModel.idFormaPago == null)) {
      this.openSnackBar('Falta Ingresar la Forma de Pago', 'Error al ingresar el Pago de Alumno');
      return 1;
    } else if ((this._registroPagosModel.descripcionPago == '' || this._registroPagosModel.descripcionPago == null)) {
      this.openSnackBar('Falta Ingresar la Descripcion del Pago', 'Error al ingresar el Pago de Alumno');
      return 1;
    }
  } // FND-00005
*/

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
    this.codPlatoSend = null;
    this.idPlatoSend = null;
    this.nombrePlatoSend = null;
    this.descPlatoSend = null;
    this.idTipoPlatoSend = null;
    this.calificacionSend = null;
    this.selected = null;
  }
} // FIN Clase RegistroPagosComponent


/**
* Definicion de la Interface de los Datos
* Se incluye los Campos que se visualizaran en la Tabla
*/
export interface UserData {
  // Propiedades de las Clase
  idPlato: number;
  codPlato: string;
  nombrePlato: string;
  descripcionPlato: string;
  idTipoPlato: number;
  descTipoPlato: string;
  calificacionPlato: string;
}
