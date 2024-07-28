import { Repository } from "../shared/repository.js";
import { Medic } from "./medic.entity.js";

const Medics = [
    new Medic(
        'John',
        'Cataldi',
        52542,
        451235132
    ),
]


export class MedicRepository implements Repository<Medic> {
    
    public findAll(): Medic[] | undefined {
        return Medics
    }

    public findOne(item: { id: string }): Medic | undefined {
        return Medics.find(medic => medic.dni === Number(item.id))
    }

    public add(item: Medic): Medic | undefined {
        Medics.push(item)
        return item
    }

    public update(item: Medic): Medic | undefined {
        const index = Medics.findIndex(medic => medic.dni === item.dni)
        if(index !== -1){
            Medics[index] = { ...Medics[index], ...item}
        }
        return Medics[index]
    }

    public delete(item: { id: string }): Medic | undefined{
        const index = Medics.findIndex(medic => medic.dni === Number(item.id))

        if(index !== -1){
            const deletedMedics = Medics[index]
            Medics.splice(index, 1);
            return deletedMedics
        }
        
    }
}