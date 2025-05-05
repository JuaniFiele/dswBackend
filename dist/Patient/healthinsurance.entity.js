var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Entity, OneToMany, Property, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "./patient.entity.js";
export let HealthInsurance = class HealthInsurance extends BaseEntity {
    constructor() {
        super(...arguments);
        this.patients = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], HealthInsurance.prototype, "name", void 0);
__decorate([
    OneToMany(() => Patient, patient => patient.healthInsurance, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], HealthInsurance.prototype, "patients", void 0);
HealthInsurance = __decorate([
    Entity()
], HealthInsurance);
//# sourceMappingURL=healthinsurance.entity.js.map