import { InfoType, Model, PaginatedEntity, PaginateDto } from '@dev4vin/nest_data';
import { BaseServiceImpl } from './base.service';
export declare type BaseViewOptions<T> = {
    ref: T;
    publicFns?: FnType[];
    roleFns?: FnRole[];
    hiddenFns?: FnType[];
};
/**
 *
 * Function type enum used to denote function operation kind
 * @export
 * @enum {string}
 */
export declare enum FnType {
    /**
     * Fetch operations
     */
    FIND = 0,
    /**
     * Update operations
     */
    UPDATE = 1,
    /**
     * Create operations
     */
    CREATE = 2,
    /**
     * Delete operations
     */
    DELETE = 3
}
/**
 * Role enum used to attach a number of user roles to a given function operation
 */
export declare type FnRole = {
    /**
     * the give function type
     */
    fnType: FnType;
    /**
     * the roles of users that can execute it
     */
    roles: string[];
};
/**
 * Base crud operations for a service
 * All services should implement this through extending
 * <example-url>http://localhost/demo/mysample.component.html</example-url>
 * @export
 * @interface BaseViewImpl
 * @template T
 */
export interface BaseViewImpl<T extends Model> {
    /**
     * finds one record
     * @param {number} id the record id to be fetched
     * @return {*}  {Promise<T>}
     * @memberof BaseViewImpl
     */
    findOne(id: number): Promise<T>;
    /**
     *
     *  finds all records
     * @param {PaginateDto} info
     * @return {*}  {Promise<PaginatedEntity<T>>}
     * @memberof BaseViewImpl
     */
    findAll(info: PaginateDto): Promise<PaginatedEntity<T>>;
    /**
     *
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof BaseViewImpl
     */
    remove(id: number): Promise<boolean>;
    /**
     *
     *
     * @param {*} data
     * @return {*}  {Promise<T>}
     * @memberof BaseViewImpl
     */
    createOne(data: any): Promise<T>;
    /**
     *
     *
     * @param {number} id
     * @param {*} data
     * @return {*}  {Promise<T>}
     * @memberof BaseViewImpl
     */
    updateOne(id: number, data: any): Promise<T>;
    /**
     *
     *
     * @param {InfoType} data
     * @return {*}  {Promise<boolean>}
     * @memberof BaseViewImpl
     */
    removeMany(data: InfoType): Promise<boolean>;
    /**
     *
     *
     * @param {FnHook<T>} hook
     * @memberof BaseViewImpl
     */
    registerCreateHook(hook: FnHook<T>): any;
}
/**
 * Hook functions for views
 */
export declare type FnHook<T extends Model> = {
    /**
     * called before current function
     */
    preFn?: (t: T) => Promise<T>;
    /**
     * called after current function
     */
    postFn?: (t: T) => Promise<any>;
};
/**
 * Base crud functions
 * Example usage:
 * <example-url>http://localhost/demo/mysample.component.html</example-url>
 * <example-url>/demo/mysample.component.html</example-url>
 */
export declare class BaseView<T extends Model> implements BaseViewImpl<T> {
    private baseService;
    createHook: FnHook<T>;
    /**
     *
     * @param hook hook for create functions
     */
    registerCreateHook(hook: FnHook<T>): void;
    constructor(baseService: BaseServiceImpl<T>);
    updateOne(id: number, data: any): Promise<T>;
    findOne(id: number): Promise<T>;
    findAll(info: PaginateDto): Promise<PaginatedEntity<T>>;
    remove(id: number): Promise<boolean>;
    createOne(data: any): Promise<T>;
    removeMany(data: InfoType): Promise<boolean>;
}
