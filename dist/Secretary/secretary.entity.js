var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property } from "@mikro-orm/core";
import { UserBase } from "../UserBase/userBase.entity.js";
export let Secretary = class Secretary extends UserBase {
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretary.prototype, "dni", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretary.prototype, "firstname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretary.prototype, "lastname", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretary.prototype, "mail", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Secretary.prototype, "dniType", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Secretary.prototype, "username", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Secretary.prototype, "password", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Secretary.prototype, "bornDate", void 0);
Secretary = __decorate([
    Entity()
], Secretary);
//# sourceMappingURL=secretary.entity.js.map