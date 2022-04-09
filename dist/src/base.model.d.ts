import { Model } from '@dev4vin/nest_data';
import { BaseEntity } from 'typeorm';
interface ModelActions extends Model {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}
export declare type UIDModel = {
    uId?: string;
};
export declare type SoftDeleteModel = {
    deletedAt?: Date;
};
export declare abstract class BaseModelImpl extends BaseEntity implements UIDModel, SoftDeleteModel, ModelActions {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    uId?: string | undefined;
    deletedAt?: Date | undefined;
}
export declare class BaseModel extends BaseModelImpl {
    that: any;
    constructor();
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    uId?: string | undefined;
    deletedAt?: Date | undefined;
}
export {};
