/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name EvaluacionesModel
 * @alias _evaluacionesModel
 * @version 1.0.0
 */
export class EvaluacionNotaTeoricaModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idNotaTeorica: number,
    public codNota: string,

    // Relaciones
    public idAlumno: number,
    public nombres: string,
    public apellidos: string,
    public codAlumno: string,
    public idInstructor: number,

    // Evaluaciones
    public notaExamen: number,
    public observaciones: string,
    public urlDocumentoNota: string,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,

  ) { }
}
