import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../../../pagos/revertir-pagos/revertir-pagos.component';

import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas"
import { EvaluacionPracticaService } from '../../service/evaluacion-practica.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvaluacionCortesPrecisionService } from '../../service/evaluacion-cortes-precision.service';

@Component({
  selector: 'app-evaluacion-cortes-precision-print',
  templateUrl: './evaluacion-cortes-precision-print.component.html',
  styleUrls: ['./evaluacion-cortes-precision-print.component.scss'],
  providers: [EvaluacionCortesPrecisionService],
})
export class EvaluacionCortesPrecisionPrintComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  public JsonOutgetListEvaluacionCortesPrecision: any;

  // Datos de la Evaluacion]
  public codEvaluacionCortePrecision: string;
  public notaFinal: number;
  public descripcionPlato: string;
  public fechaEvaluacion: Date;
  public higieneGeneralObs: string;
  public higieneGeneralNota: number;
  public nombreInstructor: string;
  public filoCuchilloObs: string;
  public filoCuchilloNota: number;
  public medidasCortesObs: string;
  public medidasCortesNota: number;
  public pesoCorteObs: string;
  public pesoCorteNota: number;
  public tecnicaCuchilloObs: string;
  public tecnicaCuchilloNota: number;
  public uniformeCompletoObs: string;
  public uniformeCompletoNota: number;
  public limpiezaObs: string;
  public limpiezaNota: number;

  constructor(
    public dialogRef: MatDialogRef<EvaluacionCortesPrecisionPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _evaluacionCortesPrecisionService: EvaluacionCortesPrecisionService,
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
    const token1 = this._evaluacionCortesPrecisionService.getToken();

    // Llamamos al Servicio que provee la Eval. Cortes de Precision a detalle del Alumno
    this._evaluacionCortesPrecisionService.getEvaluacionCortePrecisionByAlumno({ "idAlumno": this.data.idAlumno }, token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetListEvaluacionCortesPrecision = response.data;
          // this.openSnackBar(response.msg, 'Error al obtener la informacion');
          // this.showData2 = false;
          // console.log(response.msg);
          alert('Error al obtener la Informacion ' + response.msg);
          this.dialogRef.close();
          return -1;
        } else {
          this.JsonOutgetListEvaluacionCortesPrecision = response.data;
          console.log(this.JsonOutgetListEvaluacionCortesPrecision);
          this.codEvaluacionCortePrecision = this.JsonOutgetListEvaluacionCortesPrecision[0]["codEvaluacionCortePrecision"];
          this.notaFinal = this.JsonOutgetListEvaluacionCortesPrecision[0]["notaFinal"];
          this.descripcionPlato = this.JsonOutgetListEvaluacionCortesPrecision[0]["idPlato"]["descripcionPlato"];
          this.fechaEvaluacion = this.JsonOutgetListEvaluacionCortesPrecision[0]["fechaEvaluacion"];
          this.higieneGeneralObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["higieneGeneralObs"];
          this.higieneGeneralNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["higieneGeneralNota"];
          this.nombreInstructor = this.JsonOutgetListEvaluacionCortesPrecision[0]["idInstructor"]["nombre1"] + this.JsonOutgetListEvaluacionCortesPrecision[0]["idInstructor"]["apellido1"];
          this.uniformeCompletoObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["uniformeCompletoObs"];
          this.uniformeCompletoNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["uniformeCompletoNota"];
          this.limpiezaObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["limpiezaObs"];
          this.limpiezaNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["limpiezaNota"];
          this.filoCuchilloObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["filoCuchilloObs"];
          this.filoCuchilloNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["filoCuchilloNota"];
          this.medidasCortesObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["medidasCortesObs"];
          this.medidasCortesNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["medidasCortesNota"];
          this.pesoCorteObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["pesoCorteObs"];
          this.pesoCorteNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["pesoCorteNota"];
          this.tecnicaCuchilloObs = this.JsonOutgetListEvaluacionCortesPrecision[0]["tecnicaCuchilloObs"];
          this.tecnicaCuchilloNota = this.JsonOutgetListEvaluacionCortesPrecision[0]["tecnicaCuchilloNota"];

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
