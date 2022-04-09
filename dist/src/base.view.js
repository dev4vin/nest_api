"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = exports.FnType = void 0;
/**
 *
 * Function type enum used to denote function operation kind
 * @export
 * @enum {string}
 */
var FnType;
(function (FnType) {
    /**
     * Fetch operations
     */
    FnType[FnType["FIND"] = 0] = "FIND";
    /**
     * Update operations
     */
    FnType[FnType["UPDATE"] = 1] = "UPDATE";
    /**
     * Create operations
     */
    FnType[FnType["CREATE"] = 2] = "CREATE";
    /**
     * Delete operations
     */
    FnType[FnType["DELETE"] = 3] = "DELETE";
})(FnType = exports.FnType || (exports.FnType = {}));
/**
 * Base crud functions
 * Example usage:
 * <example-url>http://localhost/demo/mysample.component.html</example-url>
 * <example-url>/demo/mysample.component.html</example-url>
 */
class BaseView {
    constructor(baseService) {
        this.baseService = baseService;
        // @ts-ignore
        this.createHook = undefined;
    }
    /**
     *
     * @param hook hook for create functions
     */
    registerCreateHook(hook) {
        this.createHook = hook;
    }
    async updateOne(id, data) {
        // @ts-ignore
        return await this.baseService.updateInfo(id, data);
    }
    async findOne(id) {
        // @ts-ignore
        return await this.baseService.findOneWithId(id);
    }
    async findAll(info) {
        // @ts-ignore
        return await this.baseService.find(info);
    }
    async remove(id) {
        return await this.baseService.remove(id);
    }
    async createOne(data) {
        if (this.createHook !== undefined && this.createHook.preFn !== undefined) {
            await this.createHook.preFn(data);
        }
        const result = await this.baseService.saveInfo(data);
        if (this.createHook !== undefined && this.createHook.postFn !== undefined) {
            // @ts-ignore
            await this.createHook.postFn(result);
        }
        // @ts-ignore
        return result;
    }
    async removeMany(data) {
        return await this.baseService.removeMany(data);
    }
}
exports.BaseView = BaseView;
//# sourceMappingURL=base.view.js.map