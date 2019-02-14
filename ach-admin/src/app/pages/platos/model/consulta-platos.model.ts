/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name ConsultaPlatosModel
 * @alias _consultaPlatosModel
 * @version 1.0.0
 */
export class ConsultaPlatosModel {
    // Contructor de la clase
    constructor(
        // Identificacion Pago
        public idPlato: number,
        public codPlato: string,
        public nombrePlato: string,
        public descripcionPlato: string,

        // Identificacion Plato
        public idTipoPlato: number,
        public estrellas: any,

        public calificacionPlato: any,
        
    ) { }
}
