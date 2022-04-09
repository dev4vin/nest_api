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
exports.BaseResolver = void 0;
const commons_1 = require("@dev4vin/commons");
const nest_data_1 = require("@dev4vin/nest_data");
const graphql_1 = require("@nestjs/graphql");
const base_resolver_1 = require("./base.resolver");
const base_view_1 = require("./base.view");
function BaseResolver(ref) {
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
    const singleRef = (() => {
        (0, commons_1.info)({
            name: 'resolver type ref',
            msg: classRef
        });
        return classRef.name.substring(0, classRef.name.length - 1);
    })();
    let InputTypeT = 
    // @ts-ignore
    class InputTypeT extends (0, graphql_1.PartialType)(classRef) {
    };
    InputTypeT = __decorate([
        (0, graphql_1.InputType)(`${singleRef}Input`)
        // @ts-ignore
    ], InputTypeT);
    let InfoTypeT = class InfoTypeT extends nest_data_1.InfoType {
    };
    InfoTypeT = __decorate([
        (0, graphql_1.InputType)(`${singleRef}Info`)
    ], InfoTypeT);
    // @ts-ignore
    let PaginatedType = 
    // @ts-ignore
    class PaginatedType extends (0, nest_data_1.Paginated)(classRef) {
    };
    PaginatedType = __decorate([
        (0, graphql_1.ObjectType)(`${classRef.name}PaginatedType`)
        // @ts-ignore
    ], PaginatedType);
    let BaseResolverHost = class BaseResolverHost extends base_view_1.BaseView {
        constructor(baseService) {
            super(baseService);
        }
        createOne(data) {
            return super.createOne({ ...data });
        }
        findOne(id) {
            return super.findOne(id);
        }
        findAll(paginateInfo) {
            const info = { ...paginateInfo, filter: { ...paginateInfo.filter } };
            // @ts-ignore
            return super.findAll(info);
        }
        removeMany(data) {
            return super.removeMany(data);
        }
        updateOne(id, data) {
            return super.updateOne(id, data);
        }
        remove(id) {
            return super.remove(id);
        }
    };
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.CREATE, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, graphql_1.Mutation)(() => classRef, {
            // @ts-ignore
            name: `${classRef.name.toLowerCase()}`,
            nullable: false
        }),
        __param(0, (0, graphql_1.Args)('input', { type: () => InputTypeT })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InputTypeT]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "createOne", null);
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.FIND, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, graphql_1.Query)(() => classRef, {
            name: `${singleRef.toLowerCase()}`,
            nullable: true
        }),
        __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "findOne", null);
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.FIND, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, graphql_1.Query)(() => PaginatedType, { name: `${classRef.name.toLowerCase()}` }),
        __param(0, (0, graphql_1.Args)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [nest_data_1.PaginateDto]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "findAll", null);
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.DELETE, publicFns, roleFns),
        (0, graphql_1.Mutation)(() => Boolean, {
            // @ts-ignore
            name: `removeMany${classRef.name}`,
            nullable: false
        }),
        __param(0, (0, graphql_1.Args)('info', { type: () => InfoTypeT })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [InfoTypeT]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "removeMany", null);
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.UPDATE, publicFns, roleFns)
        // @ts-ignore
        ,
        (0, graphql_1.Mutation)(() => classRef, {
            name: `patch${singleRef}`,
            nullable: false
        }),
        __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
        __param(1, (0, graphql_1.Args)('data', { type: () => InputTypeT })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Object]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "updateOne", null);
    __decorate([
        (0, base_resolver_1.GqlGate)(base_view_1.FnType.DELETE, publicFns, roleFns),
        (0, graphql_1.Mutation)(() => Boolean, {
            name: `remove${singleRef}`,
            nullable: false
        }),
        __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseResolverHost.prototype, "remove", null);
    BaseResolverHost = __decorate([
        (0, graphql_1.Resolver)({ isAbstract: true }),
        __metadata("design:paramtypes", [Object])
    ], BaseResolverHost);
    function hideFn(name) {
        Object.defineProperty(BaseResolverHost.prototype, name, {
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
    // @ts-ignore
    return BaseResolverHost;
}
exports.BaseResolver = BaseResolver;
//# sourceMappingURL=BaseResolver.js.map