import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';

// Impotamos los Servicios a Utilizar
import { ListasComunesService } from '../../../shared/services/listas.service';
import { ConsultaAlumnoService } from '../service/consulta.service.service';
import { ConsultaAlumnoModel } from '../model/consulta.alumno.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consulta.alumnos',
  templateUrl: './consulta.alumnos.component.html',
  styleUrls: ['./consulta.alumnos.component.scss'],
  providers: [ListasComunesService, ConsultaAlumnoService]
})
export class ConsultaAlumnosComponent implements OnInit {
  // displayedColumns = ['id', 'name', 'progress', 'color', 'accion'];
  displayedColumns = ['idAlumno', 'codAlumno', 'nombres', 'apellidos',
    'celular', 'email', 'fechaIngreso', 'medioConoceAch', 'descTipoBeca', 'descripcionEstado', 'montoPago'];
  // Recuros de los Dato con la Interface
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

  /**
   * Constructor de la Clase
   * @param _listasComunes 
   * @param _consultaAlumnoServices 
   * @param snackBar 
   */
  constructor(private _listasComunes: ListasComunesService,
    private _consultaAlumnoServices: ConsultaAlumnoService,
    public snackBar: MatSnackBar, ) {

    // Iniciamos las Listas Comunes
    this.getAllListAlumnos();

    // console.log(this.JsonOutgetAllListAlumnos);
    this.dataSource = new MatTableDataSource(this.JsonOutgetAllListAlumnos);
  }

  // Configuracion del Mensaje de Confirmacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /*****************************************************
  * Funcion: ngOnInit
  *
  ******************************************************/
  ngOnInit() {
    // Definicion de la Insercion de los Datos de Nueva Comunicacion
    this._consultaAlumnoModel = new ConsultaAlumnoModel(0, '', // Identificacion
      '', '', '', '', '', '', // Generales 1
      0, 0, '', 0, null, true, 0, '', // Generales 2
      '', 0, '', '', 0, '', '', 0, '', 0, // Padres
      '', 0, '', 0, // Encargados
      '', '', '', 0, 1, 0, '', null, null, // Complentarios
    );

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
 * Interface de uso de la Clase
 */
export interface UserData {
  idAlumno: number;
  codAlumno: string;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  fechaIngreso: Date;

  celular: number;
  direccion: string;

  medioConoceAch: string;
  descTipoBeca: string;
  montoPago: number;
  descripcionEstado: string;
}
