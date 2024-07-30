import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesController } from './planes/planes.controller';
import { PlanesService } from './planes/planes.service';

@Module({
  imports: [],
  controllers: [AppController, PlanesController],
  providers: [AppService, PlanesService],
})
export class AppModule {}
