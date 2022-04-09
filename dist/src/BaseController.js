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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const commons_1 = require("@dev4vin/commons");
const nest_data_1 = require("@dev4vin/nest_data");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_controller_1 = require("./base.controller");
const base_view_1 = require("./base.view");
const BaseService_1 = require("./BaseService");
/**
 *
 *
 * @export
 * @template T
 * @param {T} classRef
 * @param {FnType[]} [publicFns=[]]
 * @param {FnRole[]} [roleFns=[]]
 * @return {*}  {Type<BaseViewImpl<T>>}
 */
const BaseController = (ref) => {
    const { classRef, publicFns, roleFns, hiddenFns } = ((param) => {
        if (typeof param === 'object' && (0, commons_1.hasOwnProperty)(param, 'ref')) {
            return {
                classRef: param.ref,
                publicFns: param.publicFns || [],
                roleFns: param.roleFns || [],
                hiddenFns: param.hiddenFns || []
            };
        }
        return { classRef: param, publicFns: [], roleFns: [], hiddenFns: [] };
    })(ref);
    // @ts-ignore
    class InputType extends (0, swagger_1.PartialType)(classRef) {
    }
    /**
     *
     *
     * @class BaseControllerHost
     * @extends {BaseView<T>}
     */
    // @ts-ignore
    let BaseControllerHost = 
    // @ts-ignore
    //@ApiExtraModels(PaginatedEntity, classRef)
    class BaseControllerHost extends base_view_1.BaseView {
        constructor(baseService) {
            super(baseService);
        }
        async removeMany(data) {
            const result = await super.removeMany(data);
            if (!result) {
                throw new common_1.NotFoundException();
            }
            return result;
        }
        updateOne(id, data) {
            return super.updateOne(id, data);
        }
        // @ts-ignore
        //@ApiPaginatedResponse(classRef)
        findAll(info) {
            return super.findAll(info);
        }
        async findOne(id) {
            const data = await super.findOne(id);
            if (!data) {
                throw new common_1.NotFoundException();
            }
            return data;
        }
        remove(id) {
            return super.remove(id);
        }
        createOne(data) {
            return super.createOne(data);
        }
    };
    __decorate([
        (0, common_1.Delete)(),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.DELETE, publicFns, roleFns),
        (0, swagger_1.ApiNotFoundResponse)(),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [nest_data_1.InfoType]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "removeMany", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        (0, swagger_1.ApiNotFoundResponse)(),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.UPDATE, publicFns, roleFns),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "updateOne", null);
    __decorate([
        (0, common_1.Get)(),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.FIND, publicFns, roleFns),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [nest_data_1.PaginateDto]),
        __metadata("design:returntype", void 0)
    ], BaseControllerHost.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.FIND, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, nest_data_1.ApiModel200Response)(classRef)
        // @ts-ignore
        ,
        (0, nest_data_1.Api404Response)(classRef),
        (0, swagger_1.ApiNotFoundResponse)(),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "findOne", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiNotFoundResponse)(),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.DELETE, publicFns, roleFns),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], BaseControllerHost.prototype, "remove", null);
    __decorate([
        (0, common_1.Post)(),
        (0, base_controller_1.ApiGate)(base_view_1.FnType.CREATE, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, nest_data_1.ApiModel200Response)(classRef),
        (0, swagger_1.ApiBody)({ type: InputType }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "createOne", null);
    BaseControllerHost = __decorate([
        (0, swagger_1.ApiTags)(`${classRef.name.toLowerCase()}`)
        // @ts-ignore
        //@ApiExtraModels(PaginatedEntity, classRef)
        ,
        __metadata("design:paramtypes", [BaseService_1.AbstractService])
    ], BaseControllerHost);
    function hideFn(name) {
        Object.defineProperty(BaseControllerHost.prototype, name, {
            value: undefined,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
    hiddenFns.forEach((fn) => {
        if (fn === base_view_1.FnType.FIND) {
            hideFn('findOne');
            hideFn('findAll');
        }
        else if (fn === base_view_1.FnType.CREATE) {
            hideFn('createOne');
        }
    });
    return BaseControllerHost;
};
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map