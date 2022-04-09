import { hasOwnProperty, Type } from '@dev4vin/commons';
import { Api404Response, ApiModel200Response, ApiPaginatedResponse, InfoType, Model, PaginatedEntity, PaginateDto } from '@dev4vin/nest_data';
import { Body, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiNotFoundResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { ApiGate } from './base.controller';
import { BaseServiceImpl } from './base.service';
import { BaseView, BaseViewOptions, FnRole, FnType } from './base.view';
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
export const BaseController = <T extends Model>(ref: { new(): T } | BaseViewOptions<{ new(): T }>): { new(baseService: AbstractService<T>): Type } => {
  const {
    classRef, publicFns, roleFns, hiddenFns
  }: {
    classRef: { new(): T };
    publicFns: FnType[];
    roleFns: FnRole[];
    hiddenFns: FnType[];
  } = ((param: { new(): T } | BaseViewOptions<{ new(): T }>) => {
    if (typeof param === 'object' && hasOwnProperty(param, 'ref')) {
      return {
        classRef: param.ref,
        publicFns: param.publicFns || [],
        roleFns: param.roleFns || [],
        hiddenFns: param.hiddenFns || []
      };
    }
    return { classRef: param, publicFns: [], roleFns: [], hiddenFns: [] };
  })(ref);

  // @ts-ignore
  class InputType extends PartialType(classRef) { }
  /**
   *
   *
   * @class BaseControllerHost
   * @extends {BaseView<T>}
   */
  // @ts-ignore
  @ApiTags(`${classRef.name.toLowerCase()}`)
  // @ts-ignore
  //@ApiExtraModels(PaginatedEntity, classRef)
  class BaseControllerHost extends BaseView<T> {
    constructor(baseService: AbstractService<T>) {
      super(baseService);
    }

    @Delete()
    @ApiGate(FnType.DELETE, publicFns, roleFns)
    @ApiNotFoundResponse()
    override async removeMany(@Query() data: InfoType): Promise<boolean> {
      const result = await super.removeMany(data);
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    }

    @Patch(':id')
    @ApiNotFoundResponse()
    @ApiGate(FnType.UPDATE, publicFns, roleFns)
    override updateOne(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<T> {
      return super.updateOne(id, data);
    }

    // @ts-ignore
    //@ApiPaginatedResponse(classRef)
    @Get()
    @ApiGate(FnType.FIND, publicFns, roleFns)
    override findAll(@Query() info: PaginateDto) {
      return super.findAll(info);
    }

    @Get(':id')
    @ApiGate(FnType.FIND, publicFns, roleFns)
    // @ts-ignore
    @ApiModel200Response(classRef)
    // @ts-ignore
    @Api404Response(classRef)
    @ApiNotFoundResponse()
    override async findOne(@Param('id', ParseIntPipe) id: number) {
      const data = await super.findOne(id);
      if (!data) {
        throw new NotFoundException();
      }
      return data;
    }

    @Delete(':id')
    @ApiNotFoundResponse()
    @ApiGate(FnType.DELETE, publicFns, roleFns)
    override remove(@Param('id', ParseIntPipe) id: number) {
      return super.remove(id);
    }

    @Post()
    @ApiGate(FnType.CREATE, publicFns, roleFns)
    // @ts-ignore
    @ApiModel200Response(classRef)
    @ApiBody({ type: InputType })
    override createOne(@Body() data: any): Promise<T> {
      return super.createOne(data);
    }
  }

  function hideFn(name: string) {
    Object.defineProperty(BaseControllerHost.prototype, name, {
      value: undefined,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }

  hiddenFns.forEach((fn) => {
    if (fn === FnType.FIND) {
      hideFn('findOne');
      hideFn('findAll');
    } else if (fn === FnType.CREATE) {
      hideFn('createOne');
    }
  });

  return BaseControllerHost;
}
