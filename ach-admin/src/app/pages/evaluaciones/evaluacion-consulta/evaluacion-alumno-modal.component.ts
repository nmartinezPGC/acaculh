import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { RevertirPagosAlumnoModalComponent } from '../../pagos/revertir-pagos/revertir-pagos-alumno-modal.component';
import { DialogData } from '../../pagos/revertir-pagos/revertir-pagos.component';
import { RevertirPagosService } from '../../pagos/service/revertir-pagos.service';
import { EvaluacionConsultaService } from '../service/evaluacion-consulta.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-evaluacion-alumno-modal',
  templateUrl: './evaluacion-alumno-modal.component.html',
  styleUrls: ['./evaluacion-alumno-modal.component.scss'],
  providers: [EvaluacionConsultaService],
})
export class EvaluacionAlumnoModalComponent implements OnInit {
  checkedEP = false;
  checkedEC = false;
  checkedEPL = false;
  checkedEQ = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  chefNotaFinalObs: string;
  public notaFinal: number = 0;

  /**
   * 
   * @param dialogRef 
   * @param data 
   * @param _evaluacionConsultaService 
   * @param _snackBar 
   */
  constructor(
    public dialogRef: MatDialogRef<EvaluacionAlumnoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    const sumNotas: number = (Number(this.data['EvaluacionCocinaPractica']) +
      Number(this.data['EvaluacionCortePrecision']) + Number(this.data['EvaluacionPlato']) +
      Number(this.data['EvaluacionQueso'])) / 4;

    this.notaFinal = sumNotas;
  }

  checkAll() {
    this.checkedEC = true;
    this.checkedEPL = true;
    this.checkedEP = true;
    this.checkedEQ = true;
  }


  /**
   * aprobarNotas
   * Aprueba las Notas por el Chef a cargo 
   */
  aprobarNotas() {
    // Evalua que se ha ingresado la Observacion del Chef
    if (this.chefNotaFinalObs == null) {
      alert('Error: Falta ingresar la Observacion del Chef');
      return -1;
    }

    // Prepara los datos a Enviar
    const token1 = this._evaluacionConsultaService.getToken();

    // Verificacion de seleccion de las Opciones | Cocina Practica
    if (this.checkedEP == true) {
      // Prepara los parametros para enviar el Json
      const jsonSend = {
        "codEvalCocinaPractica": this.data["codEvalCocinaPractica"],
        "idEvalCocinaPractica": this.data['idEvaluacionCocinaPractica'],
        "chefNotaFinalObs": this.chefNotaFinalObs,
      }

      // Llamamos al Servicio que provee la Aprobacion de la Nota
      this._evaluacionConsultaService.aprobarEvaluacionPractica(token1, jsonSend).subscribe(
        response => {
          // Validacion del response
          if (response.status === 'error') {
            alert('Error: ' + response.msg);
          } else {
            alert(response.msg);
          }
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.openSnackBar(err.message, 'Client-side error');
          } else {
            this.openSnackBar(err.message, 'Server-side error');
          }
        });
    }

    // Verificacion de seleccion de las Opciones | Cortes de Precision
    if (this.checkedEC == true) {
      // Prepara los parametros para enviar el Json
      const jsonSend = {
        "codEvalCortePrecision": this.data["codEvalCortePrecision"],
        "idEvalCortePrecision": this.data['idEvalCortePrecision'],
        "chefNotaFinalObs": this.chefNotaFinalObs,
      }

      // Llamamos al Servicio que provee la Aprobacion de la Nota
      this._evaluacionConsultaService.aprobarEvaluacionCortePrecison(token1, jsonSend).subscribe(
        response => {
          // Validacion del response
          if (response.status === 'error') {
            alert('Error: ' + response.msg);
          } else {
            alert(response.msg);
          }
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.openSnackBar(err.message, 'Client-side error');
          } else {
            this.openSnackBar(err.message, 'Server-side error');
          }
        });
    }


    // Verificacion de seleccion de las Opciones | Platos
    if (this.checkedEPL == true) {
      // Prepara los parametros para enviar el Json
      console.log(this.data);
      const jsonSend = {
        "codEvalPlato": this.data["codEvalPlato"],
        "idEvalPlato": this.data['idEvalPlato'],
        "chefNotaFinalObs": this.chefNotaFinalObs,
      }

      // Llamamos al Servicio que provee la Aprobacion de la Nota
      this._evaluacionConsultaService.aprobarEvaluacionPlato(token1, jsonSend).subscribe(
        response => {
          // Validacion del response
          if (response.status === 'error') {
            alert('Error: ' + response.msg);
          } else {
            alert(response.msg);
          }
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.openSnackBar(err.message, 'Client-side error');
          } else {
            this.openSnackBar(err.message, 'Server-side error');
          }
        });
    }


    // Verificacion de seleccion de las Opciones | Queso
    if (this.checkedEQ == true) {
      // Prepara los parametros para enviar el Json
      console.log(this.data);
      const jsonSend = {
        "codEvalQueso": this.data["codEvalQueso"],
        "idEvalQueso": this.data['idEvalQueso'],
        "chefNotaFinalObs": this.chefNotaFinalObs,
      }

      // Llamamos al Servicio que provee la Aprobacion de la Nota
      this._evaluacionConsultaService.aprobarEvaluacionQueso(token1, jsonSend).subscribe(
        response => {
          // Validacion del response
          if (response.status === 'error') {
            alert('Error: ' + response.msg);
          } else {
            this.dialogRef.close();
            alert(response.msg);
          }
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.openSnackBar(err.message, 'Client-side error');
          } else {
            this.openSnackBar(err.message, 'Server-side error');
          }
        });
    }

  }

}

/**
 * Definicion de la Interface de los Datos
 * Se incluye los Campos que se visualizaran en la Tabla
 */
export interface AlumnosEvaluacionesData {
  // Propiedades de las Clase
  codDocumento: string;
  descFormaPago: string;
  descTipoPago: string;
  descripcionEstado: string;
  fechaPago: Date;
  horaPago: Date;
  idPago: number;
  montoPago: number;
  descripcionPago: string;
  // Accione
}