import { Controller, Get, Param, Res } from '@nestjs/common';
import { PlanSuscripcion } from 'src/PlanSuscripcion';
import { PlanesService } from './planes.service';
import { Response } from 'express';

@Controller('planes')
export class PlanesController {
    constructor(private readonly planesService: PlanesService) { }
    
    @Get()
    obtenerPlanes(): PlanSuscripcion[] {
        return this.planesService.obtenerPlanes();
    }
    @Get(':id')
    obtenerPlan(@Param('id') id: number, @Res() response: Response) {
        const plan = this.planesService.obtenerPlan(id);
        if (plan) {
            response.status(200).send(plan);
        } else {
            response.status(404).send({ error: 'Plan no existe' });
        }
    }

}
