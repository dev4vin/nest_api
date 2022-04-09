import { GqlJwtAuthGuard, GqlRoleGuard, Public } from '@dev4vin/nest_auth';
import { applyDecorators, ExecutionContext, UseGuards } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { FnRole, FnType } from './base.view';

export function isResolvingGraphQLField(context: ExecutionContext): boolean {
  if (context.getType<GqlContextType>() === 'graphql') {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const parentType = info.parentType.name;
    return parentType !== 'Query' && parentType !== 'Mutation';
  }
  return false;
}

export const GqlGate = (fnType: FnType, fnTypes: FnType[] = [], roleFns: FnRole[] = []) => {
  const decorators = [];
  if (fnType in fnTypes) {
    decorators.push(Public());
  } else {
    const guards: string[] = [];
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
      decorators.push(UseGuards(GqlRoleGuard(...guards)));
    } else {
      decorators.push(UseGuards(GqlJwtAuthGuard));
    }
  }
  return applyDecorators(...decorators);
};


