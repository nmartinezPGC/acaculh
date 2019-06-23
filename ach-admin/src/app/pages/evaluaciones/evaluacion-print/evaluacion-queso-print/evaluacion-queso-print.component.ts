import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../../../pagos/revertir-pagos/revertir-pagos.component';

import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas"
import { HttpErrorResponse } from '@angular/common/http';
import { EvaluacionQuesoService } from '../../service/evaluacion-queso.service';

@Component({
  selector: 'app-evaluacion-queso-print',
  templateUrl: './evaluacion-queso-print.component.html',
  styleUrls: ['./evaluacion-queso-print.component.scss'],
  providers: [EvaluacionQuesoService]
})
export class EvaluacionQuesoPrintComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  public JsonOutgetListEvaluacionQueso: any;

  // Datos de la Evaluacion]
  public codEvaluacionQueso: string;
  public notaFinal: number;
  public descripcionPlato: string;
  public fechaEvaluacion: Date;
  public presentacionObs: string;
  public presentacionNota: number;
  public nombreInstructor: string;
  public conocimientoTemaObs: string;
  public conocimientoTemaNota: number;
  public reporteEscritoObs: string;
  public reporteEscritoNota: number;
  public uniformeObs: string;
  public uniformeNota: number;
  public degustacionObs: string;
  public degustacionNota: number;

  constructor(
    public dialogRef: MatDialogRef<EvaluacionQuesoPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _evaluacionQuesoService: EvaluacionQuesoService,
    public _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    // Carga la Evaluacion del Alumno
    this.getEvaluacionPracticaAlumno();
  }

  /**
   * Funcion de Imprirmir Documentos
   * Linbreria jspdf
   */
  download() {
    const doc = new jsPDF('p', 'pt', 'letter');

    let print = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 20, 30, {
      'width': 190,
      'elementHandlers': print
    });

    // doc.output('test.pdf');

    // Save the PDF
    doc.save('Alumno_' + this.data.nombres + '.pdf');
  } // Find de jspdf


  public captureScreen() {
    let data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  /*****************************************************
    * Funcion: FND-00001
    * Fecha: 08-01-2019
    * Descripcion: Carga la Lista de la Evaluacion Cortes
    * del Alumno
    * Objetivo: Obtener la lista de la Evaluacion Cortes 
    * del Alumno de la BD, Llamando a la API, por su metodo
    * ( /evaulaciones/list-evaluacion-corte-precision ).
    ******************************************************/
  getEvaluacionPracticaAlumno() {
    // Mostramos el Loader
    // this.showData2 = true;

    // Prepara los datos a Enviar
    const token1 = this._evaluacionQuesoService.getToken();

    // Llamamos al Servicio que provee la Eval. Plato a detalle del Alumno
    this._evaluacionQuesoService.getEvaluacionQuesoByAlumno({ "idAlumno": this.data.idAlumno }, token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetListEvaluacionQueso = response.data;
          // this.openSnackBar(response.msg, 'Error al obtener la informacion');
          // this.showData2 = false;
          alert('Error al obtener la Informacion ' + response.msg);
          this.dialogRef.close();
          return -1;
          // console.log(response.msg);
        } else {
          this.JsonOutgetListEvaluacionQueso = response.data;
          console.log(this.JsonOutgetListEvaluacionQueso);
          this.codEvaluacionQueso = this.JsonOutgetListEvaluacionQueso[0]["codEvaluacionQueso"];
          this.notaFinal = this.JsonOutgetListEvaluacionQueso[0]["notaFinal"];
          this.descripcionPlato = this.JsonOutgetListEvaluacionQueso[0]["idPlato"]["descripcionPlato"];
          this.fechaEvaluacion = this.JsonOutgetListEvaluacionQueso[0]["fechaEvaluacion"];
          this.nombreInstructor = this.JsonOutgetListEvaluacionQueso[0]["idInstructor"]["nombre1"] + this.JsonOutgetListEvaluacionQueso[0]["idInstructor"]["apellido1"];
          this.presentacionObs = this.JsonOutgetListEvaluacionQueso[0]["presentacionObs"];
          this.presentacionNota = this.JsonOutgetListEvaluacionQueso[0]["presentacionNota"];
          this.conocimientoTemaObs = this.JsonOutgetListEvaluacionQueso[0]["conocimientoTemaObs"];
          this.conocimientoTemaNota = this.JsonOutgetListEvaluacionQueso[0]["conocimientoTemaNota"];
          this.reporteEscritoObs = this.JsonOutgetListEvaluacionQueso[0]["reporteEscritoObs"];
          this.reporteEscritoNota = this.JsonOutgetListEvaluacionQueso[0]["reporteEscritoNota"];
          this.uniformeObs = this.JsonOutgetListEvaluacionQueso[0]["uniformeObs"];
          this.uniformeNota = this.JsonOutgetListEvaluacionQueso[0]["uniformeNota"];
          this.degustacionObs = this.JsonOutgetListEvaluacionQueso[0]["degustacionObs"];
          this.degustacionNota = this.JsonOutgetListEvaluacionQueso[0]["degustacionNota"];
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          // this.openSnackBar(err.message, 'Client-side error');
          // this.showData2 = false;
        } else {
          // console.log('Server-side error');
          // this.openSnackBar(err.message, 'Server-side error');
          // this.showData2 = false;
        }
      });
  } // FIN : FND-00001


}
