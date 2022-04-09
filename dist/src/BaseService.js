"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = exports.BaseService = void 0;
const commons_1 = require("@dev4vin/commons");
const typeorm_1 = require("typeorm");
const util_1 = require("util");
const BaseService = (ref) => {
    return class extends AbstractService {
        getRef() {
            return ref;
        }
    };
};
exports.BaseService = BaseService;
class AbstractService {
    buildWhereWithQueryBuilder(builder, paginatedInfo, transform) {
        const alias = builder.alias;
        let where = {};
        if (paginatedInfo.filter) {
            try {
                where = JSON.parse(paginatedInfo.filter);
                (0, commons_1.info)({
                    name: 'where body buider',
                    msg: where
                });
                for (const [key, value] of Object.entries(where)) {
                    if ((0, util_1.isArray)(value)) {
                        if (key === 'ids') {
                            builder.andWhere(`${alias}.id IN (:...ids)`, {
                                ids: value
                            });
                        }
                    }
                    else {
                        const value1 = transform ? transform(key, value) : value;
                        if (value1 === value) {
                            builder.andWhere(`${alias}.${key} LIKE :${key}`, {
                                [key]: '%' + value + '%'
                            });
                        }
                        else {
                            builder.andWhere(value1);
                        }
                    }
                }
            }
            catch (e) {
                where = {};
            }
        }
        else {
            (0, commons_1.info)({
                name: 'where body buider no filter',
                msg: where
            });
        }
        return builder.skip(paginatedInfo.offset).take(paginatedInfo.limit);
    }
    buildWhere(paginatedInfo, filter = {}) {
        let where = {};
        if (paginatedInfo.filter) {
            try {
                where = JSON.parse(paginatedInfo.filter);
                for (const [key, value] of Object.entries(where)) {
                    if ((0, util_1.isArray)(value)) {
                        if (key === 'ids') {
                            Object.defineProperty(where, 'id', {
                                value: (0, typeorm_1.In)(value),
                                writable: false,
                                enumerable: true,
                                configurable: true
                            });
                        }
                    }
                    else {
                        Object.defineProperty(where, key, {
                            value: (0, typeorm_1.Like)('%' + value + '%'),
                            writable: false,
                            enumerable: true,
                            configurable: true
                        });
                    }
                }
            }
            catch (e) {
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
        (0, commons_1.info)({
            name: 'where body',
            msg: where
        });
        return where;
    }
    buildSort(paginatedInfo) {
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
            }
            catch (e) { }
        }
        (0, commons_1.info)({
            name: 'sort body',
            msg: sort
        });
        return sort;
    }
    buildSortWithQueryBuilder(builder, paginatedInfo) {
        const alias = builder.alias;
        const sort = this.buildSort(paginatedInfo);
        for (const [key, value] of Object.entries(sort)) {
            if (value.includes('ASC')) {
                builder.orderBy(`${alias}.${key}`, 'ASC');
            }
            else {
                builder.orderBy(`${alias}.${key}`, 'DESC');
            }
        }
        return builder;
    }
    buildQuery(paginatedInfo, alias, transform, ref) {
        const repo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
        return this.buildSortWithQueryBuilder(this.buildWhereWithQueryBuilder(
        //@ts-ignore
        repo.createQueryBuilder(alias), paginatedInfo, transform), paginatedInfo);
    }
    findOneWithId(id, ref) {
        const repo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
        // @ts-ignore
        return repo.findOne({
            where: { id }
        });
    }
    saveInfo(info, ref) {
        (0, commons_1.info)({
            name: 'Info',
            msg: info
        });
        // @ts-ignore
        const repo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
        return repo.save(info);
    }
    async updateInfo(id, info, ref = undefined) {
        // @ts-ignore
        const repo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
        const model = await repo.findOne({
            where: { id }
        });
        // @ts-ignore
        return await repo.save({ ...info, id: model.id });
    }
    async removeMany(id, ref = undefined) {
        // @ts-ignore
        const joinRepo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
        const records = await joinRepo.delete(this.buildWhere(id));
        // @ts-ignore
        return records.affected > 0;
    }
    async find(paginatedInfo, ref = undefined) {
        // const repo = getRepository(this.getRef());
        try {
            // @ts-
            return (this.buildQuery(paginatedInfo, 'm', undefined, ref)
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
            })));
        }
        catch (e) {
            // console.error(e);
            throw e;
        }
    }
    findMany(paginatedInfo, ref) {
        try {
            // @ts-ignore
            return (this.buildQuery(paginatedInfo, 'm', undefined, ref)
                .getMany()
                // return repo
                //   .findAndCount({
                //     where: this.buildWhere(paginatedInfo),
                //     skip: paginatedInfo.offset,
                //     take: paginatedInfo.limit,
                //     order: this.buildSort(paginatedInfo),
                //   })
                .then((data) => data));
        }
        catch (e) {
            // console.error(e);
            throw e;
        }
    }
    async remove(id, ref = undefined) {
        // @ts-ignore
        const repo = (0, typeorm_1.getRepository)(ref ?? this.getRef());
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
exports.AbstractService = AbstractService;
//# sourceMappingURL=BaseService.js.map