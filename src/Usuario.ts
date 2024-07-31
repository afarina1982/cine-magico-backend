import { PlanSuscripcion } from './PlanSuscripcion.js';
import { Pelicula } from './pelicula';

export class Usuario {
    email: any;
    plan: any;
    peliculasFavoritas: any;
    constructor(
        public id: number,
        public nombre: string,
        public correoElectronico: string,
        public edad: number,
        public contrasena: string,
        public planSuscripcion: PlanSuscripcion,
        public historialVisualizaciones: Pelicula[],
        public generosFavoritos: string[],
    ) { }
}