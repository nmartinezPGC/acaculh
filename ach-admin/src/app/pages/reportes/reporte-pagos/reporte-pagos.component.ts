import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { RevertirPagosAlumnoModalComponent } from '../../pagos/revertir-pagos/revertir-pagos-alumno-modal.component';
import { RevertirPagosModel } from '../../pagos/model/revertir-pagos.model';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { ConsultaAlumnoService } from '../../consultas/service/consulta.service.service';
import { RevertirPagosService } from '../../pagos/service/revertir-pagos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportePagosModalComponent } from './reporte-pagos-modal/reporte-pagos-modal.component';

@Component({
  selector: 'app-reporte-pagos',
  templateUrl: './reporte-pagos.component.html',
  styleUrls: ['./reporte-pagos.component.scss'],
  providers: [ListasComunesService, RevertirPagosService, ConsultaAlumnoService],
})
export class ReportePagosComponent implements OnInit {
  // Configuracion de las Columnas
  displayedColumns = ['idAlumno', 'codAlumno', 'nombres', 'apellidos',
    'celular', 'email', 'noPagos', 'totalPagos', 'actions'];

  // Componentes de la Datatable
  dataSource: MatTableDataSource<AlumnosPagosData>;

  // Ventana Modal
  fileNameDialogRef: MatDialogRef<ReportePagosModalComponent>;

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
  public noPagosSend: number;
  public totalPagosSend: number;

  // Modelo de clase a utilizar
  public _revertirPagosModel: RevertirPagosModel;


  /**
  * Constructor de la Clase
  * @param _listasComunes
  * @param _consultaAlumnoServices
  * @param _snackBar
  */
  constructor(private _listasComunes: ListasComunesService,
    private _consultaAlumnoServices: ConsultaAlumnoService,
    public _snackBar: MatSnackBar,
    public _revertirPagosService: RevertirPagosService,
    public dialog: MatDialog) {

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
  * Metodo para usar la ventana Modal de los Datos
  * de todos los pagos que han realizado.
  */
  openDialog(idAlumnoIn: number, nombresIn: string, apellidosIn: string,
    codAlumnoIn: string, emailIn: string, celularIn: number) {
    const dialogRef = this.dialog.open(ReportePagosModalComponent, {
      data: {
        idAlumno: idAlumnoIn, nombres: nombresIn, apellidos: apellidosIn,
        codAlumno: codAlumnoIn, email: emailIn, celular: celularIn,
      },
      width: '70%',
    });

    // Cuando se cierra la ventana Modal
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      // Cargamos la ventana con las Consultas Actualizadas
      this.getAllListAlumnos();
    });

    // Cuando se abre la ventana Modal
    dialogRef.afterOpen().subscribe(result => {
      console.log('Dialog result: ' + name);
    });

    // Inhabilitar que la ventana no se cierre por error
    dialogRef.disableClose = true;
  }

  /**
  * Clase Inicial del Componente
  */
  ngOnInit() {
  }

  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 24-12-2018
  * Descripcion: Carga la Lista de todos los Alumnos
  * Objetivo: Obtener la lista de Todos los Alumnos
  * de la BD, Llamando a la API, por su metodo
  * ( /pagos/all-list-pagos ).
  ******************************************************/
  getAllListAlumnos() {
    // Mostramos el Loader
    this.showData = true;

    // Prepara los datos a Enviar
    const token1 = this._revertirPagosService.getToken();

    // Llamamos al Servicio que provee todos los Alumnos ACH
    this._revertirPagosService.listAllPagos(token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListAlumnos = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion de los Alumnos resgitrados en la BD');
        } else {
          this.JsonOutgetAllListAlumnos = response.data;
          // console.log(this.JsonOutgetAllListAlumnos);
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

}


/**
* Definicion de la Interface de los Datos
* Se incluye los Campos que se visualizaran en la Tabla
*/
export interface AlumnosPagosData {
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
  // Pagos
  noPagos: number;
  totalPagos: number;
}
