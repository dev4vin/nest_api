"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGate = exports.ApiResource = void 0;
const nest_auth_1 = require("@dev4vin/nest_auth");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiResource = () => {
    return (0, common_1.applyDecorators)(swagger_1.ApiNotFoundResponse, swagger_1.ApiNoContentResponse, swagger_1.ApiOkResponse, swagger_1.ApiForbiddenResponse);
};
exports.ApiResource = ApiResource;
const ApiGate = (fnType, fnTypes = [], roleFns = []) => {
    const decorators = [];
    if (fnType in fnTypes) {
        decorators.push((0, nest_auth_1.Public)());
    }
    else {
        const guards = [];
        roleFns.forEach((roleFn) => {
            roleFn.roles.forEach((role) => {
                if (roleFn.fnType.toString() === fnType.toString()) {
                    guards.push(role);
                }
            });
        });
        decorators.push((0, swagger_1.ApiBearerAuth)(nest_auth_1.AuthOptions.docName));
        if (guards.length >= 1) {
            decorators.push((0, swagger_1.ApiOperation)({
                summary: `Guards ${guards.map((g) => g.toString()).join(', ')}`
            }));
            decorators.push((0, common_1.UseGuards)((0, nest_auth_1.RoleGuard)(...guards)));
        }
        else {
            decorators.push((0, common_1.UseGuards)(nest_auth_1.JwtAuthGuard));
        }
        decorators.push((0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }));
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiGate = ApiGate;
//# sourceMappingURL=base.controller.js.map