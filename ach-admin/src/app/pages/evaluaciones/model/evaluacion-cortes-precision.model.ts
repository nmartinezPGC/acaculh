/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name EvaluacionCortesPrecision
 * @alias _evaluacionCortesPrecision
 * @version 1.0.0
 */
export class EvaluacionCortesPrecisionModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idEvaluacionCortePrecision: number,
    public codEvalCocinaCortePrecision: string,

    // Relaciones
    public idPlato: number,
    public descPlato: string,
    public idInstructor: number,
    public idAlumno: number,

    // Evaluaciones
    public higieneGeneralObs: string, // Higiene
    public higieneGeneralNota: number,
    public limpiezaObs: string,
    public limpiezaNota: number,

    public correctoUniformeObs: string, // Uniforme
    public correctoUniformeNota: number,

    public filoCuchilloObs: string, // Uso de Cuchillos
    public filoCuchilloNota: number,
    public tecnicaCuchilloObs: string,
    public tecnicaCuchilloNota: number,
    
    public medidasCortesObs: string, // Medidas
    public medidasCortesNota: number,
    
    public tecnicapesoCorteObs: string, // Peso
    public tecnicapesoCorteNota: number,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,
    public notaFinal: number,

  ) { }
}
