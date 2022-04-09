import { ExecutionContext } from '@nestjs/common';
import { FnRole, FnType } from './base.view';
export declare function isResolvingGraphQLField(context: ExecutionContext): boolean;
export declare const GqlGate: (fnType: FnType, fnTypes?: FnType[], roleFns?: FnRole[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
