import { Type } from '@dev4vin/commons';
import { Model } from '@dev4vin/nest_data';
import { BaseServiceImpl } from './base.service';
import { BaseViewOptions } from './base.view';
export declare function BaseResolver<T extends Model>(ref: {
    new (): T;
} | BaseViewOptions<{
    new (): T;
}>): {
    new (baseService: BaseServiceImpl<T>): Type;
};
