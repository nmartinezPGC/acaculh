import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoicealumno',
  templateUrl: './invoice.alumno.component.html',
  styleUrls: ['./invoice.alumno.component.scss']
})
export class InvoiceAlumnoComponent implements OnInit {
  // Variables de Inicio
  public mensaje: string;
  public showTarget: boolean;

  public datosAlumno: DatosAlumno;

  // Identificacion
  idAlumno: number;
  codAlumno?: string;

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

  constructor() { }

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

    // Datos Complementarios

    // this.datosAlumno.codAlumno = datosSendJson.codAlumno;
    // console.log('Datos de Alumno en Funcion saludo ++++ ' + this.datosAlumno.codAlumno);
  }
}

// Interface de Datos
interface DatosAlumno {
  // Identificacion
  // idAlumno: number;
  codAlumno?: string;

  // Generales
  /*nombre1: string;
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

  // Padres
  nombrePadre: string;
  idProfesionPadre: number;
  nombreMadre: string;
  idProfesionMadre: number;
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
  fechaIngreso: Date;
  horaIngreso: Date;
  */
}
