/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name RegistroPagosModel
 * @alias _registroPagosModel
 * @version 1.0.0
 */
export class RegistroPagosModel {
    // Contructor de la clase
    constructor(
        // Identificacion Pago
        public idPago: number,
        public codDocumento: string,
        public fechaPago: Date,
        public horaPago: Date,
        public conceptoPago: string,
        public montoPago: number,
        public descripcionPago: string,
        public url_documento: string,

        // Identificacion Alumno
        public idAlumno: number,
        public codAlumno: string,
        public nombres: string,
        public apellidos: string,
        public inicialesAlumno: string,
        public email: string,
        public celular: number,

        // Relaciones de Tablas
        public idEstado: number,
        public descEstado: string,
        public idFormaPago: number,
        public descFormaPago: string,
        public idTipoPago: number,
        public descTipoPago: string,
        public idUsuarioPago: number,

    ) { }
}
