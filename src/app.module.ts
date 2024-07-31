import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesController } from './planes/planes.controller';
import { PlanesService } from './planes/planes.service';
import { PeliculasController } from './peliculas/peliculas.controller';
import { PeliculasService } from './peliculas/peliculas.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';

@Module({
  imports: [],
  controllers: [AppController, PlanesController, PeliculasController, UsuariosController],
  providers: [AppService, PlanesService, PeliculasService, UsuariosService],
})
export class AppModule {}
