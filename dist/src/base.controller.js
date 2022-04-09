"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGate = exports.ApiResource = exports.Authenticated = exports.AuthOptions = void 0;
const nest_auth_1 = require("@dev4vin/nest_auth");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
exports.AuthOptions = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter token',
    in: 'header',
    docName: 'JWT-auth'
};
const Authenticated = (guards = [], summary = '') => {
    const decorators = [];
    if (guards.length > 0) {
        decorators.push((0, common_1.UseGuards)((0, nest_auth_1.RoleGuard)(...guards)));
        decorators.push((0, swagger_1.ApiBearerAuth)(exports.AuthOptions.docName));
        decorators.push((0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden.' }));
        decorators.push((0, swagger_1.ApiOperation)({
            summary: `Guards ${guards.map((g) => g.toString()).join(', ')}, ${summary}`
        }));
    }
    else {
        decorators.push((0, common_1.UseGuards)(nest_auth_1.JwtAuthGuard));
        decorators.push((0, swagger_1.ApiBearerAuth)(exports.AuthOptions.docName));
        decorators.push((0, swagger_1.ApiOperation)({
            summary: `${summary}`
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.Authenticated = Authenticated;
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
        decorators.push((0, swagger_1.ApiBearerAuth)(exports.AuthOptions.docName));
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