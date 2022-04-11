import { FnRole, FnType } from './base.view';
export declare const ApiResource: () => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare const ApiGate: (fnType: FnType, fnTypes?: FnType[], roleFns?: FnRole[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
