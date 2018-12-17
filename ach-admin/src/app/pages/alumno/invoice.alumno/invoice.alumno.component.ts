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

  constructor() { }

  ngOnInit() {
    this.mensaje = 'Saludo desde el Componente hijo';
    this.showTarget = false;
  }

  saludo(value: any) {
    this.showTarget = true;
    this.mensaje = JSON.stringify(value);
    const datosSendJson = JSON.parse( this.mensaje);
    console.log('Datos del Model ----- ' + datosSendJson.codAlumno );
    this.datosAlumno.codAlumno = datosSendJson.codAlumno;
    console.log('Datos de Alumno en Funcion saludo ++++ ' + this.datosAlumno);
  }
}

// Interface de Datos
interface DatosAlumno {
  // Identificacion
  idAlumno: number;
  codAlumno: string;

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
}
