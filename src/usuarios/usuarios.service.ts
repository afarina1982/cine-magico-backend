import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from 'src/PlanSuscripcion';
import { Reproduccion } from 'src/Reproduccion';
import { Usuario } from 'src/Usuario';



@Injectable()
export class UsuariosService {
    private usuarios = [];
    obtenerUsuarioPorCorreo: any;

    constructor() {
        const planSuscripcion = new PlanSuscripcion(1, 'Plan básico', 5000, 'Puedes ver películas en calidad estándar', true);
        this.usuarios.push(new Usuario(1, 'usuario1', 'usuario1@gmail.com', 7, '1234', planSuscripcion, [], ['Animación', 'Fantasía']));
        this.usuarios.push(new Usuario(2, 'usuario2', 'usuario2@gmail.com', 15, 'abcd', planSuscripcion, [], ['Acción', 'Aventura']));
        this.usuarios.push(new Usuario(3, 'usuario3', 'usuario3@gmail.com', 23, 'qwerty', planSuscripcion, [], ['Ciencia Ficción']));
    }
    registrarUsuario(usuario: Usuario): void {
        usuario.id = this.usuarios.length + 1;
        this.usuarios.push(usuario);

    }
    obtenerUsuarioPorId(id: number): Usuario {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id == id) {
                return this.usuarios[i];
            }
        }
        return null;
    }

    editarUsuario(id: number, usuario: Usuario): void {
        let usuarioEncontrado = this.buscarUsuarioPorId(id);
        usuarioEncontrado.nombre = usuario.nombre;
        usuarioEncontrado.email = usuario.email;
        usuarioEncontrado.edad = usuario.edad;
        usuarioEncontrado.contrasena = usuario.contrasena;
        usuarioEncontrado.plan = usuario.plan;
        usuarioEncontrado.peliculasFavoritas = usuario.peliculasFavoritas;
        usuarioEncontrado.generosFavoritos = usuario.generosFavoritos;
    }
    buscarUsuarioPorId(id: number): Usuario {
        for (let i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id == id) {
                return this.usuarios[i];
            }
        }
        return null;
    }

    agregarReproduccion(usuarioId: number, reproduccion: any): void {
        const usuario = this.obtenerUsuarioPorId(usuarioId);
        if (usuario) {
            
            if (!usuario.historialVisualizaciones) {
                usuario.historialVisualizaciones = []; 
            }
            usuario.historialVisualizaciones.push(reproduccion);
        }
    }
}







