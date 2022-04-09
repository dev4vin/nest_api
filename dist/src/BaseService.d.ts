import { InfoType, Model, PaginatedEntity, PaginateDto } from '@dev4vin/nest_data';
import { SelectQueryBuilder } from 'typeorm';
import { BaseServiceImpl } from './base.service';
export declare const BaseService: <T extends {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>(ref: new () => T) => new () => BaseServiceImpl<T>;
export declare abstract class AbstractService<T extends Model> implements BaseServiceImpl<T> {
    abstract getRef(): {
        new (): T;
    };
    buildWhereWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto, transform?: (key: string, value: any) => any): SelectQueryBuilder<T>;
    buildWhere(paginatedInfo: InfoType, filter?: {}): {};
    buildSort(paginatedInfo: PaginateDto): {};
    buildSortWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto): SelectQueryBuilder<T>;
    buildQuery(paginatedInfo: PaginateDto, alias?: string, transform?: (key: any, value: any) => any, ref?: new () => Model): SelectQueryBuilder<T> | SelectQueryBuilder<{
        new (): Model;
    }>;
    findOneWithId(id: number, ref?: new () => {
        id?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }): Promise<{
        id?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }> | Promise<T>;
    saveInfo(info: any, ref?: new () => {
        id?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }): Promise<{
        id?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }> | Promise<T>;
    updateInfo(id: number, info: any, ref?: undefined): Promise<any>;
    removeMany(id: InfoType, ref?: undefined): Promise<boolean>;
    find(paginatedInfo: PaginateDto, ref?: undefined): Promise<PaginatedEntity<any>>;
    findMany(paginatedInfo: PaginateDto, ref?: new () => Model): Promise<Model[]> | Promise<T[]>;
    remove(id: number, ref?: undefined): Promise<boolean>;
}
