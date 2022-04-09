"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlGate = exports.isResolvingGraphQLField = void 0;
const nest_auth_1 = require("@dev4vin/nest_auth");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
function isResolvingGraphQLField(context) {
    if (context.getType() === 'graphql') {
        const gqlContext = graphql_1.GqlExecutionContext.create(context);
        const info = gqlContext.getInfo();
        const parentType = info.parentType.name;
        return parentType !== 'Query' && parentType !== 'Mutation';
    }
    return false;
}
exports.isResolvingGraphQLField = isResolvingGraphQLField;
const GqlGate = (fnType, fnTypes = [], roleFns = []) => {
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
        if (guards.length >= 1) {
            // decorators.push(
            //   ApiOperation({
            //     summary: `Guards ${guards.map((g) => g.toString()).join(', ')}`,
            //   }),
            // );
            decorators.push((0, common_1.UseGuards)((0, nest_auth_1.GqlRoleGuard)(...guards)));
        }
        else {
            decorators.push((0, common_1.UseGuards)(nest_auth_1.GqlJwtAuthGuard));
        }
    }
    return (0, common_1.applyDecorators)(...decorators);
};
exports.GqlGate = GqlGate;
//# sourceMappingURL=base.resolver.js.map