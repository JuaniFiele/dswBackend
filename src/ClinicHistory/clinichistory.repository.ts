import { Repository } from "../shared/repository.js";
import { ClinicHistory } from "./clinichistory.entity.js"; 

const ClinicHistorys = [
    new ClinicHistory(
        1,
        "A+",
        "Enfermedades Crónicas: Hipertensión arterial diagnosticada a los 40 años. Cirugías: Apendicectomía a los 25 años. Alergias: Alergia a la penicilina. Hábitos: No fumador, Consumo de alcohol moderado (1-2 copas de vino por semana), Ejercicio físico regular (3 veces por semana). Medicación Actual: Losartán 50 mg una vez al día.",
        "Padre: Edad: 70 años. Enfermedades: Hipertensión arterial, infarto al miocardio a los 68 años. Madre: Edad: 68 años. Enfermedades: Diabetes tipo 2 diagnosticada a los 60 años, hipotiroidismo. Hermano Mayor: Edad: 48 años. Enfermedades: Ninguna conocida. Hermana Menor: Edad: 42 años. Enfermedades: Asma desde la infancia. Abuelos Paternos: Abuelo: Fallecido a los 75 años por complicaciones de un derrame cerebral, tenía hipertensión. Abuela: Fallecida a los 72 años por cáncer de mama. Abuelos Maternos: Abuelo: Fallecido a los 80 años por causas naturales, tenía diabetes tipo 2. Abuela: Fallecida a los 78 años por enfermedad pulmonar obstructiva crónica (EPOC)."
    ),
]


export class ClinicHistoryRepository implements Repository<ClinicHistory> {
    
    public findAll(): ClinicHistory[] | undefined {
        return ClinicHistorys
    }

    public findOne(item: { nro: number }): ClinicHistory | undefined {
        return ClinicHistorys.find(clinicHistory => clinicHistory.nro === item.nro)
    }

    public add(item: ClinicHistory): ClinicHistory | undefined {
        ClinicHistorys.push(item)
        return item
    }

    public update(item: ClinicHistory): ClinicHistory | undefined {
        const index = ClinicHistorys.findIndex(clinicHistory => clinicHistory.nro === item.nro)
        if(index !== -1){
            ClinicHistorys[index] = { ...ClinicHistorys[index], ...item}
        }
        return ClinicHistorys[index]
    }

    public delete(item: { id?: string, nro?: number }): ClinicHistory | undefined{
        const index = ClinicHistorys.findIndex(clinicHistory => clinicHistory.nro === Number(item.nro))

        if(index !== -1){
            const deletedClinicHistorys = ClinicHistorys[index]
            ClinicHistorys.splice(index, 1);
            return deletedClinicHistorys
        }
        
    }
}