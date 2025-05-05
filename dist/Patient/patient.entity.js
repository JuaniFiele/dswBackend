var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { HealthInsurance } from "./healthinsurance.entity.js";
export let Patient = class Patient extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "firstname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "lastname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "dni", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "phoneNumber", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    Property({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], Patient.prototype, "birthDate", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "grupoSanguineo", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "antecedentesPersonales", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "antecedentesFamiliares", void 0);
__decorate([
    ManyToOne(() => HealthInsurance, { nullable: true }),
    __metadata("design:type", Object)
], Patient.prototype, "healthInsurance", void 0);
Patient = __decorate([
    Entity()
], Patient);
//# sourceMappingURL=patient.entity.js.map