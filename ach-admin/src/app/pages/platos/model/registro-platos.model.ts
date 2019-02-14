/**
 * @author Nahum Martinez
 * @returns Models of the class
 * @name RegistroPlatosModel
 * @alias _registroPlatosModel
 * @version 1.0.0
 */
export class RegistroPlatosModel {
    // Contructor de la clase
    constructor(
        // Identificacion Pago
        public idPlato: number,
        public codPlato: string,
        public nombrePlato: string,
        public descripcionPlato: string,

        // Identificacion Plato
        public idTipoPlato: number,
        public estrellas: number,

        public calificacionPlato: number,
        
    ) { }
}
