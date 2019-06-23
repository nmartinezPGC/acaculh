import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogData } from '../../../pagos/revertir-pagos/revertir-pagos.component';

import * as jsPDF from 'jspdf';
import html2canvas from "html2canvas"
import { EvaluacionPracticaService } from '../../service/evaluacion-practica.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-evaluacion-practica-print',
  templateUrl: './evaluacion-practica-print.component.html',
  styleUrls: ['./evaluacion-practica-print.component.scss'],
  providers: [EvaluacionPracticaService],
})
export class EvaluacionPracticaPrintComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  JsonOutgetListEvaluacionPractica: any;

  // Datos de la Evaluacion]
  public codigoEvalPract: string;
  public notaFinal: number;
  public descripcionPlato: string;
  public fechaEvaluacion: Date;
  public higieneGeneralObs: string;
  public higieneGeneralNota: number;
  public nombreInstructor: string;
  public correctoUniformeObs: string;
  public correctoUniformeNota: number;
  public horaEntregaObs: string;
  public horaEntregaNota: number;
  public saborObs: string;
  public saborNota: number;
  public texturaObs: string;
  public texturaNota: number;
  public tecnicaObs: string;
  public tecnicaNota: number;
  public limpiezaObs: string;
  public limpiezaNota: number;
  public armadoObs: string;
  public armadoNota: number;

  public evalP: EvaluacionPracticaAlumnoInter;

  constructor(
    public dialogRef: MatDialogRef<EvaluacionPracticaPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _evaluacionPracticaService: EvaluacionPracticaService,
    public _snackBar: MatSnackBar) {

  }

  onPrint() {
    window.print();
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
    * Descripcion: Carga la Lista de la Evaluacion Practica
    * del Alumno
    * Objetivo: Obtener la lista de la Evaluacion Practica 
    * del Alumno de la BD, Llamando a la API, por su metodo
    * ( /evaulaciones/list-evaluacion-practica ).
    ******************************************************/
  getEvaluacionPracticaAlumno() {
    // Mostramos el Loader
    // this.showData2 = true;

    // Prepara los datos a Enviar
    const token1 = this._evaluacionPracticaService.getToken();

    // Llamamos al Servicio que provee todos los Pagos del Alumno
    this._evaluacionPracticaService.getEvaluacionCocinaPractiaByAlumno({ "idAlumno": this.data.idAlumno }, token1).subscribe(
      response => {
        // Validacion del response
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetListEvaluacionPractica = response.data;
          // this.openSnackBar(response.msg, 'Error al obtener la informacion');
          // this.showData2 = false;
          // console.log(response.msg);
          alert('Error al obtener la Informacion ' + response.msg);
          this.dialogRef.close();
          return -1;
        } else {
          this.JsonOutgetListEvaluacionPractica = response.data;
          console.log(this.JsonOutgetListEvaluacionPractica);
          this.codigoEvalPract = this.JsonOutgetListEvaluacionPractica[0]["codEvalCocinaPractica"];
          this.notaFinal = this.JsonOutgetListEvaluacionPractica[0]["notaFinal"];
          this.descripcionPlato = this.JsonOutgetListEvaluacionPractica[0]["idPlato"]["descripcionPlato"];
          this.fechaEvaluacion = this.JsonOutgetListEvaluacionPractica[0]["fechaEvaluacion"];
          this.higieneGeneralObs = this.JsonOutgetListEvaluacionPractica[0]["higieneGeneralObs"];
          this.higieneGeneralNota = this.JsonOutgetListEvaluacionPractica[0]["higieneGeneralNota"];
          this.nombreInstructor = this.JsonOutgetListEvaluacionPractica[0]["idInstructor"]["nombre1"] + this.JsonOutgetListEvaluacionPractica[0]["idInstructor"]["apellido1"];
          this.correctoUniformeObs = this.JsonOutgetListEvaluacionPractica[0]["correctoUniformeObs"];
          this.correctoUniformeNota = this.JsonOutgetListEvaluacionPractica[0]["correctoUniformeNota"];
          this.horaEntregaObs = this.JsonOutgetListEvaluacionPractica[0]["horaEntregaObs"];
          this.horaEntregaNota = this.JsonOutgetListEvaluacionPractica[0]["horaEntregaNota"];
          this.saborObs = this.JsonOutgetListEvaluacionPractica[0]["saborObs"];
          this.saborNota = this.JsonOutgetListEvaluacionPractica[0]["saborNota"];
          this.texturaObs = this.JsonOutgetListEvaluacionPractica[0]["texturaObs"];
          this.texturaNota = this.JsonOutgetListEvaluacionPractica[0]["texturaNota"];
          this.tecnicaObs = this.JsonOutgetListEvaluacionPractica[0]["tecnicaObs"];
          this.tecnicaNota = this.JsonOutgetListEvaluacionPractica[0]["tecnicaNota"];
          this.limpiezaObs = this.JsonOutgetListEvaluacionPractica[0]["limpiezaObs"];
          this.limpiezaNota = this.JsonOutgetListEvaluacionPractica[0]["limpiezaNota"];
          this.armadoObs = this.JsonOutgetListEvaluacionPractica[0]["armadoObs"];
          this.armadoNota = this.JsonOutgetListEvaluacionPractica[0]["armadoNota"];
          // console.log(JSON.stringify(this.fechaEvaluacion));

          // this.EvaluacionPracticaAlumno.cod = this.JsonOutgetListEvaluacionPractica.codEvalCocinaPractica;
          // Paginador de la Tabla
          // this.ngAfterViewInit();

          // this.showData2 = false;
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

export interface EvaluacionPracticaAlumnoInter {
  idEvaluacionCocinaPractica: number;
  codEvalCocinaPractica: string;
}
