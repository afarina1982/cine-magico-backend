import { Injectable } from '@nestjs/common';
import { Pelicula } from 'src/Pelicula';

@Injectable()
export class PeliculasService {
   
    private peliculas = [];
    constructor() {
        this.peliculas.push(new Pelicula(1, 'Toy Story', 'Animación', 1995, 'TE', 81, 'Inglés', ['Español', 'Francés', 'Alemán'], false));
        this.peliculas.push(new Pelicula(2, 'Harry Potter y la piedra filosofal', 'Fantasía', 2001, 'TE+7', 152, 'Inglés', ['Español', 'Francés', 'Alemán'], false));
        this.peliculas.push(new Pelicula(3, 'El juego del miedo', 'Terror', 2004, 'MA14', 117, 'Inglés', ['Español', 'Alemán'], false));

    }
    crearPelicula(pelicula: Pelicula): void {
        pelicula.id = this.peliculas.length + 1;
        this.peliculas.push(pelicula);
    }
    obtenerPeliculasPorId(id: number): Pelicula {
        for (let i = 0; i < this.peliculas.length; i++) {
            if (this.peliculas[i].id == id) {
                return this.peliculas[i];
            }
        }
        return null;
    }


    obtenerPeliculasPorGenero(genero: string): Pelicula[] {
        return this.peliculas.filter(pelicula => pelicula.genero.toLowerCase() === genero.toLowerCase());
    }
    eliminarPelicula(id: number): void {
        for (let i = 0; i < this.peliculas.length; i++) {
            if (this.peliculas[i].id == id) {
                this.peliculas.splice(i, 1);
            }
        }
    }

obtenerTodasLasPeliculas(): Pelicula[] {
    return this.peliculas;
}

}