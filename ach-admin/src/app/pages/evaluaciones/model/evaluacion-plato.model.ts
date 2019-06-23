/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name EvaluacionPlatoModel
 * @alias _evaluacionPlatoModel
 * @version 1.0.0
 */
export class EvaluacionPlatoModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idEvaluacionPlato: number,
    public codEvalCocinaPlato: string,

    // Relaciones
    public idPlato: number,
    public descPlato: string,
    public idInstructor: number,
    public idAlumno: number,

    // Evaluaciones
    public presentacionObs: string, // Higiene
    public presentacionNota: number,
    public saborObs: string,
    public saborNota: number,

    public otrosObs: string, // Uniforme
    public otrosNota: number,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,
    public notaFinal: number,

  ) { }
}
