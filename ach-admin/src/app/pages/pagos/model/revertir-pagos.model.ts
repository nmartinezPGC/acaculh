/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name RevertirPagosModel
 * @alias _revertirPagosModel
 * @version 1.0.0
 */
export class RevertirPagosModel {
    // Contructor de la clase
    constructor(
        // Identificacion Pago
        public idPagoAlumno: number,
        public codDocumento: string,
        public fechaPago: Date,
        public horaPago: Date,
        public conceptoPago: string,
        public montoPago: number,

        // Identificacion Alumno
        public idAlumno: number,
        public codAlumno: string,
        public nombres: string,
        public apellidos: string,
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
