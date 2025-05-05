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
import { ConsultationHours } from "../Medic/consultationHours.entity.js";
import { Patient } from "../Patient/patient.entity.js";
export let Attention = class Attention extends BaseEntity {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Attention.prototype, "date", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Attention.prototype, "paymentDate", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Attention.prototype, "result", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Attention.prototype, "reason", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Attention.prototype, "observation", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Attention.prototype, "dateCancelled", void 0);
__decorate([
    ManyToOne(() => ConsultationHours, { eager: true }),
    __metadata("design:type", Object)
], Attention.prototype, "consultationHours", void 0);
__decorate([
    ManyToOne(() => Patient, { nullable: true, eager: true }),
    __metadata("design:type", Object)
], Attention.prototype, "patient", void 0);
Attention = __decorate([
    Entity()
], Attention);
//# sourceMappingURL=attention.entity.js.map