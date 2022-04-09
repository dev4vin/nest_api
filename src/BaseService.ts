import { info as i } from '@dev4vin/commons';
import { InfoType, Model, PaginatedEntity, PaginateDto } from '@dev4vin/nest_data';
import { getRepository, In, Like, SelectQueryBuilder } from 'typeorm';
import { isArray } from 'util';
import { BaseServiceImpl } from './base.service';

export const BaseService = <T extends Model>(ref: { new(): T }): { new(): BaseServiceImpl<T> } => {
  return class extends AbstractService<T> {
    public getRef(): new () => T {
     return ref;
    }
  }
}

export abstract class AbstractService<T extends Model> implements BaseServiceImpl<T> {

  public abstract getRef(): { new(): T };

  public buildWhereWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto, transform?: (key: string, value: any) => any): SelectQueryBuilder<T> {
    const alias = builder.alias;
    let where = {};
    if (paginatedInfo.filter) {
      try {
        where = JSON.parse(paginatedInfo.filter);
        i({
          name: 'where body buider',
          msg: where
        });
        for (const [key, value] of Object.entries(where)) {
          if (isArray(value)) {
            if (key === 'ids') {
              builder.andWhere(`${alias}.id IN (:...ids)`, {
                ids: value
              });
            }
          } else {
            const value1 = transform ? transform(key, value) : value;
            if (value1 === value) {
              builder.andWhere(`${alias}.${key} LIKE :${key}`, {
                [key]: '%' + value + '%'
              });
            } else {
              builder.andWhere(value1);
            }
          }
        }
      } catch (e) {
        where = {};
      }
    } else {
      i({
        name: 'where body buider no filter',
        msg: where
      });
    }
    return builder.skip(paginatedInfo.offset).take(paginatedInfo.limit);
  }

  public buildWhere(paginatedInfo: InfoType, filter = {}) {
    let where = {};
    if (paginatedInfo.filter) {
      try {
        where = JSON.parse(paginatedInfo.filter);
        for (const [key, value] of Object.entries(where)) {
          if (isArray(value)) {
            if (key === 'ids') {
              Object.defineProperty(where, 'id', {
                value: In(value),
                writable: false,
                enumerable: true,
                configurable: true
              });
            }
          } else {
            Object.defineProperty(where, key, {
              value: Like('%' + value + '%'),
              writable: false,
              enumerable: true,
              configurable: true
            });
          }
        }
      } catch (e) {
        where = {};
      }
    }
    for (const [key, value] of Object.entries(filter)) {
      Object.defineProperty(where, key, {
        value,
        writable: false,
        enumerable: true,
        configurable: true
      });
    }
    i({
      name: 'where body',
      msg: where
    });
    return where;
  }

  public buildSort(paginatedInfo: PaginateDto) {
    const sort = {};
    if (paginatedInfo.sort) {
      try {
        const [id, name] = JSON.parse(paginatedInfo.sort);
        Object.defineProperty(sort, id, {
          value: name,
          writable: false,
          enumerable: true,
          configurable: true
        });
      } catch (e) { }
    }
    i({
      name: 'sort body',
      msg: sort
    });
    return sort;
  }

  public buildSortWithQueryBuilder(builder: SelectQueryBuilder<T>, paginatedInfo: PaginateDto): SelectQueryBuilder<T> {
    const alias = builder.alias;
    const sort = this.buildSort(paginatedInfo);
    for (const [key, value] of Object.entries(sort)) {
      if ((value as string).includes('ASC')) {
        builder.orderBy(`${alias}.${key}`, 'ASC');
      } else {
        builder.orderBy(`${alias}.${key}`, 'DESC');
      }
    }
    return builder;
  }

  public buildQuery(paginatedInfo: PaginateDto, alias?: string, transform?: (key: any, value: any) => any, ref?: new () => Model): SelectQueryBuilder<T> | SelectQueryBuilder<{ new(): Model }> {
    const repo = getRepository(ref ?? this.getRef());
    return this.buildSortWithQueryBuilder(
      this.buildWhereWithQueryBuilder(
        //@ts-ignore
        repo.createQueryBuilder(alias),
        paginatedInfo,
        transform
      ),
      paginatedInfo
    );
  }

  public findOneWithId(id: number, ref?: new () => { id?: number | undefined; createdAt?: Date | undefined; updatedAt?: Date | undefined; }): Promise<{ id?: number | undefined; createdAt?: Date | undefined; updatedAt?: Date | undefined; }> | Promise<T> {

    const repo = getRepository(ref ?? this.getRef());
    // @ts-ignore
    return repo.findOne({
      where: { id }
    });
  }

  public saveInfo(info: any, ref?: new () => { id?: number | undefined; createdAt?: Date | undefined; updatedAt?: Date | undefined; }): Promise<{ id?: number | undefined; createdAt?: Date | undefined; updatedAt?: Date | undefined; }> | Promise<T> {
    i({
      name: 'Info',
      msg: info
    });
    // @ts-ignore
    const repo = getRepository(ref ?? this.getRef());
    return repo.save(info);
  }

  public async updateInfo(id: number, info: any, ref = undefined) {
    // @ts-ignore
    const repo = getRepository(ref ?? this.getRef());
    const model = await repo.findOne({
      where: { id }
    });
    // @ts-ignore
    return await repo.save({ ...info, id: model.id });
  }

  public async removeMany(id: InfoType, ref = undefined): Promise<boolean> {
    // @ts-ignore
    const joinRepo = getRepository(ref ?? this.getRef());
    const records = await joinRepo.delete(this.buildWhere(id));
    // @ts-ignore
    return records.affected > 0;
  }

  public async find(paginatedInfo: PaginateDto, ref = undefined): Promise<PaginatedEntity<any>> {
    // const repo = getRepository(this.getRef());
    try {
      // @ts-
      return (
        this.buildQuery(paginatedInfo, 'm', undefined, ref)
          .getManyAndCount()
          // return repo
          //   .findAndCount({
          //     where: this.buildWhere(paginatedInfo),
          //     skip: paginatedInfo.offset,
          //     take: paginatedInfo.limit,
          //     order: this.buildSort(paginatedInfo),
          //   })
          .then(([data, count]) => ({
            data,
            count
          }))
      );
    } catch (e) {
      // console.error(e);
      throw e;
    }
  }

  public findMany(paginatedInfo: PaginateDto, ref?: new () => Model): Promise<Model[]> | Promise<T[]> {
    try {
      // @ts-ignore
      return (
        this.buildQuery(paginatedInfo, 'm', undefined, ref)
          .getMany()
          // return repo
          //   .findAndCount({
          //     where: this.buildWhere(paginatedInfo),
          //     skip: paginatedInfo.offset,
          //     take: paginatedInfo.limit,
          //     order: this.buildSort(paginatedInfo),
          //   })
          .then((data) => data)
      );
    } catch (e) {
      // console.error(e);
      throw e;
    }
  }

  public async remove(id: number, ref = undefined): Promise<boolean> {
    // @ts-ignore
    const repo = getRepository(ref ?? this.getRef());
    return await repo
      .delete({
        // @ts-ignore
        where: { id }
      })
      .then((res) => {
        // @ts-ignores
        return res.affected > 0;
      });
  }
} 
