/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name RegisterUserModel
 * @alias _registerUserModel
 * @version 1.0.0
 */
export class RegisterUserModel {
// Contructor de la clase
  constructor(
    // Identificacion
    public idUsuario: number,
    public codUsuario: string,

    // Generales
    public nombre1: string,
    public nombre2: string,
    public apellido1: string,
    public apellido2: string,
    public email: string,

    public telefono: number,
    public celular: number,
    public password: string,
    public fechaCreacion: Date,
    public horaCreacion: Date,
    public activo: boolean,
    
    // Relaciones
    public idTipoUsuario: number,
    public idEstado: number,
    public iniciales: string,
    public urlImagen: string,

    ) { }
}
