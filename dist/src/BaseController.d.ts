import { Type } from '@dev4vin/commons';
import { BaseViewOptions } from './base.view';
import { AbstractService } from './BaseService';
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
export declare const BaseController: <T extends {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>(ref: (new () => T) | BaseViewOptions<new () => T>) => new (baseService: AbstractService<T>) => Type;
