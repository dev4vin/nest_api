"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = exports.BaseModelImpl = void 0;
const typeorm_1 = require("typeorm");
class BaseModelImpl extends typeorm_1.BaseEntity {
}
exports.BaseModelImpl = BaseModelImpl;
class BaseModel extends BaseModelImpl {
    constructor() {
        super();
        this.that = this;
    }
}
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Object)
], BaseModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', {
        name: 'created_at',
        nullable: true,
        default: () => "'current_timestamp(3)'"
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], BaseModel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'u_id', length: 191 }),
    __metadata("design:type", Object)
], BaseModel.prototype, "uId", void 0);
__decorate([
    (0, typeorm_1.Column)('datetime', { name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], BaseModel.prototype, "deletedAt", void 0);
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.model.js.map