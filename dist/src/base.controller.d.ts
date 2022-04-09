import { FnRole, FnType } from './base.view';
export declare const AuthOptions: {
    type: string;
    scheme: string;
    bearerFormat: string;
    name: string;
    description: string;
    in: string;
    docName: string;
};
export declare const Authenticated: (guards?: string[], summary?: string) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare const ApiResource: () => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
export declare const ApiGate: (fnType: FnType, fnTypes?: FnType[], roleFns?: FnRole[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
