import { DecimalPipe } from "@angular/common";
import { Numeric } from "d3";

/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name AlumnoModel
 * @alias _alumnoModel
 * @version 1.0.0
 */
export class AlumnoModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idAlumno: number,
    public codAlumno: string,

    // Generales
    public nombre1: string,
    public nombre2: string,
    public apellido1: string,
    public apellido2: string,
    public inicialesAlumno: string,
    public email: string,

    public telefono: number,
    public celular: number,
    public direccion: string,
    public idGenero: number,
    public fechaNacimiento: Date,
    public hondureno: boolean,
    public idProfesion: number,
    public descProfesion: string,

    // Padres
    public nombrePadre: string,
    public idProfesionPadre: number,
    public descProfesionPadre: string,
    public nombreMadre: string,
    public idProfesionMadre: number,
    public descProfesionMadre: string,
    public trabajoPadre: string,
    public telefonoTrabajoPadre: number,
    public trabajoMadre: string,
    public telefonoTrabajoMadre: number,

    public nombreEncargado: string,
    public telefonoEncargado: number,
    public nombreEmergencia: string,
    public telefonoEmergencia: number,

    public medioConoceAch: string,
    public problemasSalud: string,
    public referencia: string,
    public idUsuarioFicha: number,
    public idEstado: number,
    public idTipoBeca: number,
    public descTipoBeca: string,
    public fechaIngreso: Date,
    public horaIngreso: Date,

    // Matriculas
    public montoMatricula: number,
    public idFormaPago: number,
    public descFormaPago: string,

    // Recursos
    public foto_alumno: string,

    // Horarios
    public idHorario: number,


  ) { }
}
