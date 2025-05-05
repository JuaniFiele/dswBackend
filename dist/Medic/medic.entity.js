var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { Specialty } from "../Specialty/specialty.entity.js";
import { ConsultationHours } from "./consultationHours.entity.js";
import { UserBase } from "../UserBase/userBase.entity.js";
export let Medic = class Medic extends UserBase {
    constructor() {
        super(...arguments);
        this.consultationHours = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Medic.prototype, "dni", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Medic.prototype, "firstname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Medic.prototype, "lastname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Medic.prototype, "dniType", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Number)
], Medic.prototype, "medicalConsultationValue", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Number)
], Medic.prototype, "license", void 0);
__decorate([
    ManyToOne(() => Specialty, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], Medic.prototype, "specialty", void 0);
__decorate([
    OneToMany(() => ConsultationHours, (consultationHours) => consultationHours.medic, { cascade: [Cascade.ALL], nullable: true }),
    __metadata("design:type", Object)
], Medic.prototype, "consultationHours", void 0);
Medic = __decorate([
    Entity()
], Medic);
//# sourceMappingURL=medic.entity.js.map