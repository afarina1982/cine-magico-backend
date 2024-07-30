import { Pelicula } from './Pelicula';

export class Reproduccion {
    constructor(
        public id: number,
        public pelicula: Pelicula,
        public fecha: Date,
    ) { }
}