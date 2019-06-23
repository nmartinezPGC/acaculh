import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../../../pagos/revertir-pagos/revertir-pagos.component';

import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas"
import { HttpErrorResponse } from '@angular/common/http';
import { EvaluacionPlatoService } from '../../service/evaluacion-plato.service';

@Component({
  selector: 'app-evaluacion-plato-print',
  templateUrl: './evaluacion-plato-print.component.html',
  styleUrls: ['./evaluacion-plato-print.component.scss'],
  providers: [ EvaluacionPlatoService ]
})
export class EvaluacionPlatoPrintComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  public JsonOutgetListEvaluacionPlato: any;

  // Datos de la Evaluacion]
  public codEvaluacionPlato: string;
  public notaFinal: number;
  public descripcionPlato: string;
  public fechaEvaluacion: Date;
  public presentacionObs: string;
  public presentacionNota: number;
  public nombreInstructor: string;
  public saborObs: string;
  public saborNota: number;
  public otrosObs: string;
  public otrosNota: number;
  public limpiezaObs: string;
  public limpiezaNota: number;

  constructor(
    public dialogRef: MatDialogRef<EvaluacionPlatoPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _evaluacionPlatoService: EvaluacionPlatoService,
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
    const token1 = this._evaluacionPlatoService.getToken();

    // Llamamos al Servicio que provee la Eval. Plato a detalle del Alumno
    this._evaluacionPlatoService.getEvaluacionPlatoByAlumno({ "idAlumno": this.data.idAlumno }, token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetListEvaluacionPlato = response.data;
          // this.openSnackBar(response.msg, 'Error al obtener la informacion');
          // this.showData2 = false;
          alert('Error al obtener la Informacion ' + response.msg);
          this.dialogRef.close();
          return -1;
          // console.log(response.msg);
        } else {
          this.JsonOutgetListEvaluacionPlato = response.data;
          console.log(this.JsonOutgetListEvaluacionPlato);
          this.codEvaluacionPlato = this.JsonOutgetListEvaluacionPlato[0]["codEvaluacionPlato"];
          this.notaFinal = this.JsonOutgetListEvaluacionPlato[0]["notaFinal"];
          this.descripcionPlato = this.JsonOutgetListEvaluacionPlato[0]["idPlato"]["descripcionPlato"];
          this.fechaEvaluacion = this.JsonOutgetListEvaluacionPlato[0]["fechaEvaluacion"];
          this.nombreInstructor = this.JsonOutgetListEvaluacionPlato[0]["idInstructor"]["nombre1"] + this.JsonOutgetListEvaluacionPlato[0]["idInstructor"]["apellido1"];
          this.presentacionObs = this.JsonOutgetListEvaluacionPlato[0]["presentacionObs"];
          this.presentacionNota = this.JsonOutgetListEvaluacionPlato[0]["presentacionNota"];
          this.saborObs = this.JsonOutgetListEvaluacionPlato[0]["saborObs"];
          this.saborNota = this.JsonOutgetListEvaluacionPlato[0]["saborNota"];
          this.otrosObs = this.JsonOutgetListEvaluacionPlato[0]["otrosObs"];
          this.otrosNota = this.JsonOutgetListEvaluacionPlato[0]["otrosNota"];
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
