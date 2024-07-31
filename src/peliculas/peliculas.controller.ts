import { Body, Controller, Delete, Get, Param, Post, Query, Res } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { Response } from 'express';
import { Pelicula } from 'src/Pelicula';




@Controller('peliculas')
export class PeliculasController {
    constructor(private readonly peliculasService: PeliculasService) { }


    @Get(':id')
    obtenerPeliculasPorId(@Param('id') id: string, @Res() response: Response) {
        const pelicula: Pelicula = this.peliculasService.obtenerPeliculasPorId(Number(id));
        if (pelicula) {
            response.status(200).send(pelicula);
        } else {
            response.status(404).send({ error: 'Pelicula no existe' });
        }
    }


    @Get()
    obtenerPeliculas(@Query('genero') genero: string): Pelicula[] {
        if (genero) {
            return this.peliculasService.obtenerPeliculasPorGenero(genero);
        } else {
            return this.peliculasService.obtenerTodasLasPeliculas();
        }
    }

    @Delete(':id')
    eliminarPelicula(@Param('id') id: string, @Res() response: Response) {
        const pelicula: Pelicula = this.peliculasService.obtenerPeliculasPorId(Number(id));
        if (pelicula) {
            this.peliculasService.eliminarPelicula(Number(id));
            response.status(200).send({ mensaje: 'Pelicula eliminada' });
        } else {
            response.status(404).send({ error: 'Pelicula no existe' });
        }
    }
    @Post()
    agregarPelicula(@Body() pelicula: Pelicula): void {
        this.peliculasService.crearPelicula(pelicula);
    }
}




