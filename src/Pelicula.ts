export class Pelicula {
    constructor(
        public id: number,
        public titulo: string,
        public genero: string,
        public anioEstreno: number,
        public calificacion: string,
        public duracion: number,
        public idiomaOriginal: string,
        public subtitulosDisponibles: string[],
        public estreno: boolean) { }
}