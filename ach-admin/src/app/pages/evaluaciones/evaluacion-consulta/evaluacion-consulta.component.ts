import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { DialogData } from '../../pagos/revertir-pagos/revertir-pagos.component';
import { EvaluacionesModel } from '../model/evaluaciones.model';
import { EvaluacionConsultaService } from '../service/evaluacion-consulta.service';

@Component({
  selector: 'app-evaluacion-consulta',
  templateUrl: './evaluacion-consulta.component.html',
  styleUrls: ['./evaluacion-consulta.component.scss'],
  providers: [EvaluacionConsultaService]
})
export class EvaluacionConsultaComponent implements OnInit {
  // Propiedades de la Clase
  public nombres;

  // Configuracion de las Columnas
  displayedColumns = ['idAlumno', 'codAlumno', 'nombres',
    'apellidos', 'email', 'celular', 'EvaluacionCocinaPractica', 'EvaluacionCortePrecision',
    'EvaluacionQuesos', 'Evaluacion', 'actions'];

  // Componentes de la Datatable
  dataSource: MatTableDataSource<AlumnosPagosData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetAllListEvaluaciones: any[];
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
  public _evaluacionesModel: EvaluacionesModel;

  /**
   * Constructor que recibe los datos de la Clase Padre
   * Utiliza los item de cada fila de la tabla
   * @param dialogRef 
   * @param data 
   * @param _revertirPagosService 
   * @param _snackBar 
   */
  constructor(
    // public dialogRef: MatDialogRef<RevertirPagosAlumnoModalComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _evaluacionConsultaService: EvaluacionConsultaService,
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

    // Iniciamos las Listas Comunes
    this.getAllListEvaluacionesAlumno();

    // console.log(this.JsonOutgetAllListAlumnos);
    this.dataSource = new MatTableDataSource(this.JsonOutgetAllListEvaluaciones);

    // console.log('Modelo de la Clase ' + JSON.stringify(this._revertirPagosModel));
  }


  /*****************************************************
    * Funcion: FND-00001
    * Fecha: 03-01-2019
    * Descripcion: Carga la Lista de todos los Pagos de 
    * Alumnos
    * Objetivo: Obtener la lista de Todos los Pagos de 
    * Alumnos de la BD, Llamando a la API, por su metodo
    * ( /evaluaciones/all-list-evaluaciones ).
    ******************************************************/
  getAllListEvaluacionesAlumno() {
    // Mostramos el Loader
    this.showData2 = true;

    // Prepara los datos a Enviar
    const token1 = this._evaluacionConsultaService.getToken();

    // Llamamos al Servicio que provee todos los Pagos del Alumno
    this._evaluacionConsultaService.evaluacionesViewAll(token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetAllListEvaluaciones = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
          this.showData2 = false;
        } else {
          this.JsonOutgetAllListEvaluaciones = response.data;
          console.log(this.JsonOutgetAllListEvaluaciones);
          this.dataSource = new MatTableDataSource(this.JsonOutgetAllListEvaluaciones);

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

}


/**
* Definicion de la Interface de los Datos
* Se incluye los Campos que se visualizaran en la Tabla
*/
export interface AlumnosPagosData {
  // Propiedades de las Clase
  idAlumno: number;
  codAlumno: string;
  celular: string;
  email: string;
  nombres: string;
  apellidos: string;
  EvaluacionCocinaPractica: number;
  EvaluacionCortePrecision: number;
  EvaluacionQuesos: number;
  Evaluacion: number;
  // Accione
}
