/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name EvaluacionQuesoModel
 * @alias _evaluacionQuesoModel
 * @version 1.0.0
 */
export class EvaluacionQuesoModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idEvaluacionQueso: number,
    public codEvalCocinaQueso: string,

    // Relaciones
    public idPlato: number,
    public descPlato: string,
    public idInstructor: number,
    public idAlumno: number,

    // Evaluaciones
    public presentacionObs: string, // Presentacion
    public presentacionNota: number,
    public conocimientoTemaObs: string, // Conocimiento
    public conocimientoTemaNota: number,
    public reporteEscritoObs: string,
    public reporteEscritoNota: number,
    public uniformeObs: string,
    public uniformeNota: number,
    public degustacionObs: string,
    public degustacionNota: number,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,
    public notaFinal: number,

  ) { }
}
