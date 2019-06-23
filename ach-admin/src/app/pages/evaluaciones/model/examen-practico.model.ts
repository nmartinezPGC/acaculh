/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name ExamenPracticoModel
 * @alias _examenPracticoModel
 * @version 1.0.0
 */
export class ExamenPracticoModel {
  // Contructor de la clase
  constructor(
    // Identificacion
    public idExamen: number,
    public codExamen: string,

    // Relaciones
    public idAlumno: number,
    public nombres: string,
    public apellidos: string,
    public codAlumno: string,
    public idInstructor: number,

    // Evaluaciones
    public notaExamen: number,
    public observaciones: string,
    public urlExamenTeorico: string,

    // Auditoria
    public fechaCreacion: Date,
    public horaCreacion: Date,

  ) { }
}
