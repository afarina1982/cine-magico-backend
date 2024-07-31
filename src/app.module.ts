import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesController } from './planes/planes.controller';
import { PlanesService } from './planes/planes.service';
import { PeliculasController } from './peliculas/peliculas.controller';
import { PeliculasService } from './peliculas/peliculas.service';

@Module({
  imports: [],
  controllers: [AppController, PlanesController, PeliculasController],
  providers: [AppService, PlanesService, PeliculasService],
})
export class AppModule {}
