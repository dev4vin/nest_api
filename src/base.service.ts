import { InfoType, Model, PaginatedEntity, PaginateDto } from '@dev4vin/nest_data';
import { SelectQueryBuilder } from 'typeorm';
/**
 * class BaseViewImpl, basic crud database functions
 * @alias BaseService
 */
export type BaseServiceImpl<T extends Model> = {
  /**
   *
   * @param builder current query builder
   * @param paginatedInfo query info
   * @param transform transforms filter key to custom values
   */
  buildWhereWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto, transform?: ((key: string, value: any) => any) | undefined): SelectQueryBuilder<T>;
  /**
   *
   *
   * @param {PaginateDto} paginatedInfo
   * @param {undefined} [filter]
   * @return {*}  {{}}
   */
  buildWhere(paginatedInfo: PaginateDto, filter?: undefined): {};
  /**
   *
   *
   * @param {PaginateDto} paginatedInfo
   * @return {*}  {{}}
   */
  buildSort(paginatedInfo: PaginateDto): {};
  /**
   *
   *
   * @param {SelectQueryBuilder<T>} builder
   * @param {PaginateDto} paginatedInfo
   * @return {*}  {SelectQueryBuilder<T>}
   */
  buildSortWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto): SelectQueryBuilder<T>;
  /**
   *
   *
   * @param {PaginateDto} paginatedInfo
   * @param {string} [alias]
   * @param {(key: string, value: any) => any} [transform]
   * @param {{ new(): Model }} [ref]
   * @return {*}  {(SelectQueryBuilder<T> | SelectQueryBuilder<{ new(): Model }>)}
   */
  buildQuery(paginatedInfo: PaginateDto, alias?: string | undefined, transform?: ((key: string, value: any) => any) | undefined, ref?: { new(): Model } | undefined): SelectQueryBuilder<T> | SelectQueryBuilder<{ new(): Model }>;
  /**
   *
   *
   * @param {PaginateDto} paginatedInfo
   * @param {Model} [ref]
   * @return {*}  {(Promise<PaginatedEntity<T>> | Promise<PaginatedEntity<Model>>)}
   */
  find(paginatedInfo: PaginateDto, ref?: Model | undefined): Promise<PaginatedEntity<T>> | Promise<PaginatedEntity<Model>>;
  /**
   *
   *
   * @param {PaginateDto} paginatedInfo
   * @param {{ new(): Model }} [ref]
   * @return {*}  {(Promise<T[]> | Promise<Model[]>)}
   */
  findMany(paginatedInfo: PaginateDto, ref?: { new(): Model } | undefined): Promise<T[]> | Promise<Model[]>;
  /**
   *
   *
   * @param {number} id
   * @param {{ new(): Model }} [ref]
   * @return {*}  {(Promise<T> | Promise<Model>)}
   */
  findOneWithId(id: number, ref?: { new(): Model } | undefined): Promise<T> | Promise<Model>;
  /**
   *
   *
   * @param {*} info
   * @param {{ new(): Model }} [ref]
   * @return {*}  {(Promise<T> | Promise<Model>)}
   */
  saveInfo(info: any, ref?: { new(): Model } | undefined): Promise<T> | Promise<Model>;
  /**
   *
   *
   * @param {number} id
   * @param {*} info
   * @param {{ new(): Model }} [ref]
   * @return {*}  {(Promise<T> | Promise<Model>)}
   */
  updateInfo(id: number, info: any, ref?: { new(): Model } | undefined): Promise<T> | Promise<Model>;
  /**
   *
   *
   * @param {InfoType} id
   * @param {{ new(): Model }} [ref]
   * @return {*}  {Promise<boolean>}
   */
  removeMany(id: InfoType, ref?: { new(): Model } | undefined): Promise<boolean>;
  /**
   *
   *
   * @param {number} id
   * @param {{ new(): Model }} [ref]
   * @return {*}  {Promise<boolean>}
   */
  remove(id: number, ref?: { new(): Model } | undefined): Promise<boolean>;
}


