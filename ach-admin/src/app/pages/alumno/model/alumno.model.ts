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
    public nombre1: number,
    public nombre2: number,
    public apellido1: number,
    public apellido2: number,
    public email: number,
    public telefono: number,
    public celular: number,
    public direccion: string,
    public idGenero: number,
    public fechaNacimiento: Date,
    public hondureno: boolean,
    public idProfesion: number,

    // Padres
    public nombrePadre: string,
    public idProfesionPadre: number,
    public nombreMadre: string,
    public idProfesionMadre: number,
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
    ) { }
}
