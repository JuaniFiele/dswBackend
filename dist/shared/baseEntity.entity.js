var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTimeType, PrimaryKey, Property } from "@mikro-orm/core";
export class BaseEntity {
}
__decorate([
    PrimaryKey(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "id", void 0);
__decorate([
    Property({ type: DateTimeType, defaultRaw: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    Property({
        type: DateTimeType,
        defaultRaw: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        onUpdate: () => new Date(),
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
//# sourceMappingURL=baseEntity.entity.js.map