import { Body, Controller, Delete, Get, Param, Post, Query, Res } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { Response } from 'express';
import { Pelicula } from 'src/Pelicula';
import { Reproduccion } from 'src/Reproduccion';
import { UsuariosService } from 'src/usuarios/usuarios.service';




@Controller('peliculas')
export class PeliculasController {
    usuariosService: any;
    constructor(private readonly peliculasService: PeliculasService, private readonly usuarioService: UsuariosService) { }



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

    @Post(':id/reproducir')
    async reproducirPelicula(@Param('id') id: number, @Body('usuarioId') usuarioId: number, @Res() response: Response) {
        
        const pelicula = await this.peliculasService.obtenerPeliculasPorId(id);
        if (!pelicula) {
            return response.status(404).send({ error: 'La película no existe' });
        }

        
        const usuario = await this.usuariosService.obtenerUsuarioPorId(usuarioId);
        if (!usuario) {
            return response.status(404).send({ error: 'Usuario no encontrado' });
        }

        
        if (pelicula.estreno && usuario.planSuscripcion !== 'Premium') {
            return response.status(404).send({ error: 'Su plan no permite reproducir la película' });
        }

        
        const edadUsuario = usuario.edad;
        if (edadUsuario < this.obtenerEdadMinima(pelicula.calificacion)) {
            return response.status(404).send({ error: 'La película no es apta para su edad' });
        }

        
        const reproduccion: Reproduccion = {
            id: Date.now(), // Generar un ID único para la reproducción
            pelicula: pelicula,
            fecha: new Date(),
        };
        await this.usuariosService.agregarReproduccion(usuarioId, reproduccion);
        
        return response.status(200).send({ mensaje: 'Reproducción exitosa', reproduccion });
    }

    private obtenerEdadMinima(calificacion: string): number {
        switch (calificacion) {
            case 'TE':
                return 0;
            case 'TE+7':
                return 7;
            case 'MA14':
                return 14;
            case 'MA18':
                return 18;
            default:
                return 0; 
    }
}
@Get('sugerencias/:usuarioId')
    sugerirPeliculas(@Param('usuarioId') usuarioId: number, @Res() response: Response) {
        const usuario = this.usuariosService.obtenerUsuarioPorId(usuarioId);
        if (!usuario) {
            return response.status(404).send({ error: 'Usuario no encontrado' });
        }
        const sugerencias = this.peliculasService.obtenerPeliculasPorGenero(usuario.generosFavoritos);
        
        return response.status(200).send(sugerencias);
    }
}







