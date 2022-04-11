import { AuthOptions, JwtAuthGuard, Public, RoleGuard } from '@dev4vin/nest_auth';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FnRole, FnType } from './base.view';

export const ApiResource = () => {
  return applyDecorators(ApiNotFoundResponse, ApiNoContentResponse, ApiOkResponse, ApiForbiddenResponse);
};

export const ApiGate = (fnType: FnType, fnTypes: FnType[] = [], roleFns: FnRole[] = []) => {
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
    decorators.push(ApiBearerAuth(AuthOptions.docName));
    if (guards.length >= 1) {
      decorators.push(
        ApiOperation({
          summary: `Guards ${guards.map((g) => g.toString()).join(', ')}`
        })
      );
      decorators.push(UseGuards(RoleGuard(...guards)));
    } else {
      decorators.push(UseGuards(JwtAuthGuard));
    }
    decorators.push(ApiForbiddenResponse({ description: 'Forbidden.' }));
  }
  return applyDecorators(...decorators);
};

