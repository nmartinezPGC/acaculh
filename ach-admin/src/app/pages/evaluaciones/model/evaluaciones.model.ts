/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name EvaluacionesModel
 * @alias _evaluacionesModel
 * @version 1.0.0
 */
export class EvaluacionesModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idEvaluacionCocinaPractica: number,
    public codEvalCocinaPractica: string,

    // Relaciones
    public idPlato: number,
    public descPlato: string,
    public idInstructor: number,
    public idAlumno: number,

    // Evaluaciones
    public higieneGeneralObs: string, // Higiene
    public higieneGeneralNota: number,
    public correctoUniformeObs: string,
    public correctoUniformenota: number,

    public horaEntregaObs: string, // Organizacion 
    public horaEntregaNota: number,
    public flujoTrabajoObs: string,
    public flujoTrabajoNota: number,
    
    public saborObs: string, // Preparacion
    public saborNota: number,
    public texturaObs: string,
    public texturaNota: number,

    public tecnicaObs: string, // Tecnica
    public tecnicaNota: number,

    public limpiezaObs: string, // Presentacion
    public limpiezaNota: number,
    public armadoObs: string,
    public armadoNota: number,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,
    public notaFinal: number,

  ) { }
}
