/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name LoginModel
 * @alias _loginModel
 * @version 1.0.0
 */
export class LoginModel {
// Contructor de la clase
  constructor(
    // Identificacion
    public idUsuario: number,
    public codUsuario: number,

    // Generales
    public nombre1: number,
    public nombre2: number,
    public apellido1: number,
    public apellido2: number,
    public email: number,
    public telefono: number,
    public celular: number,

    // Seguridad
    public password: number,
    public fechaCreacion: number,
    public horaCreacion: number,
    public activo: number,
    public idTipoUsuario: number,
    public idEstado: number,
    public iniciales: number,
  ) { }
}
