import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DialogData } from './revertir-pagos.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { RevertirPagosModel } from '../model/revertir-pagos.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RevertirPagosService } from '../service/revertir-pagos.service';


/**
 * @title Ventana Moal de la Clase
 */
@Component({
  selector: 'app-revertir-pagos-alumno-modal',
  templateUrl: './revertir-pagos-alumno-modal.component.html',
  styleUrls: ['./revertir-pagos-alumno-modal.component.scss'],
  providers: [RevertirPagosService],
})
export class RevertirPagosAlumnoModalComponent implements OnInit {
  // Propiedades de la Clase
  public nombres;

  // Configuracion de las Columnas
  displayedColumns = ['idPago', 'codDocumento', 'fechaPago', 'horaPago',
    'descFormaPago', 'descTipoPago', 'descripcionEstado', 'montoPago', 'actions'];

  // Componentes de la Datatable
  dataSource: MatTableDataSource<AlumnosPagosData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetAllListPagosAlumno: any[];
  public JsonOutgetAllListAlumnosSend: any[];

  // Variables de mostrar Datos de la tabla
  public showData: boolean = true;
  public showData2: boolean = false;
  public showData3: boolean = false;

  // Datos a enviar al Formulario
  public idAlumnoSend: number;
  public codAlumnoSend: string;
  public nombresSend: string;
  public apellidosSend: string;
  public celularSend: number;
  public noPagosSend: number;
  public totalPagosSend: number;

  // Modelo de clase a utilizar
  public _revertirPagosModel: RevertirPagosModel;

  /**
   * Constructor que recibe los datos de la Clase Padre
   * Utiliza los item de cada fila de la tabla
   * @param dialogRef 
   * @param data 
   * @param _revertirPagosService 
   * @param _snackBar 
   */
  constructor(
    public dialogRef: MatDialogRef<RevertirPagosAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _revertirPagosService: RevertirPagosService,
    public _snackBar: MatSnackBar, ) {
    // Iniciamos las Listas Comunes
    // this.getAllListPagosAlumno();

    // console.log(this.JsonOutgetAllListAlumnos);
    // this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPagosAlumno);
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


  /**
   * Metodo inicializador de la Clase
   */
  ngOnInit() {
    // Inicializacion del Modelo de la Clase
    this._revertirPagosModel = new RevertirPagosModel(
      0, null, null, null, null, 0, // 1ra Seccion
      this.data.idAlumno, this.data.codAlumno, // 2da Seccion
      this.data.nombres, this.data.apellidos, this.data.email, this.data.celular, // 2da Seccion 
      0, null, 0, null, 0, null, 0 // 3ra Seccion
    );

    // Iniciamos las Listas Comunes
    this.getAllListPagosAlumno();

    // console.log(this.JsonOutgetAllListAlumnos);
    this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPagosAlumno);

    // console.log('Modelo de la Clase ' + JSON.stringify(this._revertirPagosModel));
  }


  /*****************************************************
    * Funcion: FND-00001
    * Fecha: 03-01-2019
    * Descripcion: Carga la Lista de todos los Pagos de 
    * Alumnos
    * Objetivo: Obtener la lista de Todos los Pagos de 
    * Alumnos de la BD, Llamando a la API, por su metodo
    * ( /pagos/all-list-alumno-pagos ).
    ******************************************************/
  getAllListPagosAlumno() {
    // Mostramos el Loader
    this.showData2 = true;

    // Prepara los datos a Enviar
    const token1 = this._revertirPagosService.getToken();

    // Llamamos al Servicio que provee todos los Pagos del Alumno
    this._revertirPagosService.listAllAlumnoPagos(token1, { 'idAlumno': this.data.idAlumno }).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListPagosAlumno = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
          this.showData2 = false;
        } else {
          this.JsonOutgetAllListPagosAlumno = response.data;
          console.log(this.JsonOutgetAllListPagosAlumno);
          this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPagosAlumno);

          // Paginador de la Tabla
          this.ngAfterViewInit();

          this.showData2 = false;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
          this.showData2 = false;
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
          this.showData2 = false;
        }
      });
  } // FIN : FND-00001


  /*****************************************************
    * Funcion: FND-00002
    * Fecha: 03-01-2019
    * Descripcion: Anula el Pago del Alumno que ha 
    * selecionado desde la tabla
    * Objetivo: Anula el Pago del Alumno, Llamando a la 
    * API, por su metodo
    * ( /pagos/revert-pago-alumno ).
    ******************************************************/
  revertirPagoAlumno(idPagoAlumnoIn: number, idTipoPagoIn: number, idFormaPagoIn: number,
    codDocumentoIn: string, montopagoIn: number) {
    // Pregunta de confirmacion de Accion
    const validAction = confirm('Estas Seguro de Anular el Pago seleccionado?');
    if (validAction == false) {
      return -1;
    }

    // Mostramos el Loader
    this.showData2 = true;

    // Prepara los datos a Enviar
    const token1 = this._revertirPagosService.getToken();
    const identity = this._revertirPagosService.getIdentity();

    // Seteamos los valores el Model a enviar a la API
    this._revertirPagosModel.idPagoAlumno = idPagoAlumnoIn;
    this._revertirPagosModel.idTipoPago = idTipoPagoIn;
    this._revertirPagosModel.idFormaPago = idFormaPagoIn;
    this._revertirPagosModel.codDocumento = codDocumentoIn;
    this._revertirPagosModel.montoPago = montopagoIn;
    this._revertirPagosModel.idUsuarioPago = identity.sub;

    // Llamamos al Servicio que provee todos los Pagos del Alumno
    this._revertirPagosService.revertirPagoAlumno(token1, this._revertirPagosModel).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListPagosAlumno = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
          this.showData2 = false;
        } else {
          this.JsonOutgetAllListPagosAlumno = response.data;
          // console.log(this.JsonOutgetAllListPagosAlumno);
          this.dataSource = new MatTableDataSource(this.JsonOutgetAllListPagosAlumno);

          // Paginador de la Tabla
          this.ngAfterViewInit();

          this.showData2 = false;

          // Cargamos los Datos Nuevamente
          this.ngOnInit();
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
          this.showData2 = false;
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
          this.showData2 = false;
        }
      });
  }

}


/**
 * Definicion de la Interface de los Datos
 * Se incluye los Campos que se visualizaran en la Tabla
 */
export interface AlumnosPagosData {
  // Propiedades de las Clase
  codDocumento: string;
  descFormaPago: string;
  descTipoPago: string;
  descripcionEstado: string;
  fechaPago: Date;
  horaPago: Date;
  idPago: number;
  montoPago: number;
  // Accione
}
