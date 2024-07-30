export class PlanSuscripcion {
    constructor(
        public id: number,
        public nombre: string,
        public precio: number,
        public calidadImagen: string,
        public anuncios: boolean,
    ) { }

}