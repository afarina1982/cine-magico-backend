import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/Usuario';
import { Response } from 'express'; 


@Controller('usuarios')
export class UsuariosController {
    constructor(readonly usuariosService: UsuariosService) { }


    @Put(':id')
    modificarUsuario(@Param('id') id: number, @Body() usuarioActualizado: any, @Res() response: Response) {
        const usuarioExistente = this.usuariosService.obtenerUsuarioPorId(id);

        if (!usuarioExistente) {
            return response.status(404).send({ error: 'Usuario no encontrado' });
        }

        if (usuarioActualizado.planSuscripcion !== undefined) {
            usuarioExistente.planSuscripcion = usuarioActualizado.planSuscripcion;
        }

        if (usuarioActualizado.generosFavoritos !== undefined) {
            usuarioExistente.generosFavoritos = usuarioActualizado.generosFavoritos;
        }
        return response.status(200).send({ mensaje: 'Usuario modificado', usuario: usuarioExistente });
    }

    @Post()
    registrarUsuario(@Body() usuario: Usuario, @Res() response: Response) {
        const usuarioExistente = this.usuariosService.obtenerUsuarioPorCorreo(usuario.correoElectronico);
        if (usuarioExistente) {
            return response.status(404).send({ error: 'El correo ya existe' });
        }
        this.usuariosService.registrarUsuario(usuario);
        return response.status(200).send({ mensaje: 'Nuevo Usuario registrado' });
    }
    @Get(':id')
    obtenerUsuarioPorId(@Res() response: Response, @Param('id') id: string) {
        const usuario: Usuario = this.usuariosService.obtenerUsuarioPorId(Number(id));
        if (usuario) {
            return response.status(200).send(usuario);
        } else {
            return response.status(404).send({ error: 'Usuario no existe' });
        }

    }
}


