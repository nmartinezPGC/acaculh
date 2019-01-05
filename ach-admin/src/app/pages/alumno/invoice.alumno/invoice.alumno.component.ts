import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';


// Importar la Lireria de Impresion de pdf
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-invoicealumno',
  templateUrl: './invoice.alumno.component.html',
  styleUrls: ['./invoice.alumno.component.scss'],
  providers: [
    { provide: 'Window', useValue: window }
  ],
})
export class InvoiceAlumnoComponent implements OnInit {
  // Variables de Inicio
  public mensaje: string;
  public showTarget: boolean;

  // Identificacion
  idAlumno: number;
  codAlumno?: string;

  // Vista de la Clase en Html
  @ViewChild('example-card') exampleCard: ElementRef;

  // Generales
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  inicialesAlumno: string;
  email: string;

  telefono: number;
  celular: number;
  direccion: string;
  idGenero: number;
  fechaNacimiento: Date;
  hondureno: boolean;
  idProfesion: number;
  descProfesion: string;

  // Padres
  nombrePadre: string;
  idProfesionPadre: number;
  descProfesionPadre: string;
  nombreMadre: string;
  idProfesionMadre: number;
  descProfesionMadre: string;
  trabajoPadre: string;
  telefonoTrabajoPadre: number;
  trabajoMadre: string;
  telefonoTrabajoMadre: number;

  nombreEncargado: string;
  telefonoEncargado: number;
  nombreEmergencia: string;
  telefonoEmergencia: number;

  medioConoceAch: string;
  problemasSalud: string;
  referencia: string;
  idUsuarioFicha: number;
  idEstado: number;
  idTipoBeca: number;
  descTipoBeca: string;
  fechaIngreso: Date;
  horaIngreso: Date;

  constructor(
    @Inject('Window') private window: Window,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.mensaje = 'Saludo desde el Componente hijo';
    this.showTarget = false;
  }

  // Funcion de Impresion de Ficha de Alumno
  saludo(value: any) {
    this.showTarget = true;
    this.mensaje = JSON.stringify(value);
    const datosSendJson = JSON.parse(this.mensaje);
    console.log('Datos del Model ----- ' + datosSendJson.codAlumno);

    // Asignacion de los Campos para el fichero de Print
    this.codAlumno = datosSendJson.codAlumno;
    this.nombre1 = datosSendJson.nombre1;
    this.nombre2 = datosSendJson.nombre2;
    this.apellido1 = datosSendJson.apellido1;
    this.apellido2 = datosSendJson.apellido2;
    this.email = datosSendJson.email;
    this.telefono = datosSendJson.telefono;
    this.celular = datosSendJson.celular;
    this.direccion = datosSendJson.direccion;
    this.fechaNacimiento = datosSendJson.fechaNacimiento;
    this.descProfesion = datosSendJson.descProfesion;

    // Datos de Padres
    this.nombrePadre = datosSendJson.nombrePadre;
    this.descProfesionPadre = datosSendJson.descProfesionPadre;
    this.nombreMadre = datosSendJson.nombreMadre;
    this.descProfesionMadre = datosSendJson.descProfesionMadre;
    this.trabajoPadre = datosSendJson.trabajoPadre;
    this.trabajoMadre = datosSendJson.trabajoMadre;
    this.nombreEncargado = datosSendJson.nombreEncargado;
    this.telefonoEncargado = datosSendJson.telefonoEncargado;
    this.nombreEmergencia = datosSendJson.nombreEmergencia;
    this.telefonoEmergencia = datosSendJson.telefonoEmergencia;
    this.medioConoceAch = datosSendJson.medioConoceAch;
    this.problemasSalud = datosSendJson.problemasSalud;
    this.referencia = datosSendJson.referencia;
    this.descTipoBeca = datosSendJson.descTipoBeca;
    this.fechaIngreso = datosSendJson.fechaIngreso;

    // Datos Complementarios

    // this.datosAlumno.codAlumno = datosSendJson.codAlumno;
    // console.log('Datos de Alumno en Funcion saludo ++++ ' + this.datosAlumno.codAlumno);
  }

  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 22-12-2018
  * Descripcion: Impresion de Documentos
  * Objetivo: Impresion de Documentos
  ******************************************************/
  dowloadPDF() {
    let doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
  }

  /*****************************************************
  * Funcion: FND-00002
  * Fecha: 27-12-2018
  * Descripcion: Ventana Modal de Ficha de Alumno
  * Objetivo: Ventana Modal de Ficha de Alumno
  ******************************************************/
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    window.close();

    document.body.innerHTML = originalContents;
  }


  print() {
    let divToPrint = document.getElementById('exampleCard').innerHTML;
    let newWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    newWindow.document.open();
    newWindow.document.write(`
    <html>
        <head>
          <title>Ficha de Alumno | ACACULH</title>
          <style></style>
        </head>
        <body onload="window.print();window.close()">
          ${divToPrint}
        </body>
      </html>
    `);
    newWindow.document.close();
  }

}


// Exportamos el Componente del Modal de Ficha de Alumnos
@Component({
  selector: 'app-dialog-content-example-dialog',
  // templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}

