import { Injectable } from '@nestjs/common';
import { PlanSuscripcion } from 'src/PlanSuscripcion';

@Injectable()
export class PlanesService {
    private planSuscripcion = [];

    constructor() {
        this.planSuscripcion.push(new PlanSuscripcion(1, 'Plan Basico', 5000, 'Puedes ver peliculas en calidad estandar', true));
        this.planSuscripcion.push(new PlanSuscripcion(2, 'Plan Premium', 10000, 'Puedes ver peliculas en calidad HD', true));
        this.planSuscripcion.push(new PlanSuscripcion(3, 'Plan Premium Plus', 15000, 'Puedes ver peliculas en calidad HD y sin anuncios', false));
    }

    obtenerPlanes(): PlanSuscripcion[] {
        return this.planSuscripcion;
    }
    
    obtenerPlan(id: number): PlanSuscripcion {
        for (let i = 0; i < this.planSuscripcion.length; i++) {
            if (this.planSuscripcion[i].id == id) {
                return this.planSuscripcion[i];
            }
        }
        return null;
    }
}
