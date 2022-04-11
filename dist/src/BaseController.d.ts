import { Type } from '@dev4vin/commons';
import { BaseServiceImpl } from './base.service';
import { BaseViewOptions } from './base.view';
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
}, S extends BaseServiceImpl<T> = BaseServiceImpl<T>>(ref: (new () => T) | BaseViewOptions<new () => T>) => new (baseService: S) => Type;
