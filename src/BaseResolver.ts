import { hasOwnProperty, info as i, Type } from '@dev4vin/commons';
import { InfoType, Model, Paginated, PaginateDto } from '@dev4vin/nest_data';
import { Args, InputType, Int, Mutation, ObjectType, PartialType, Query, Resolver } from '@nestjs/graphql';
import { GqlGate } from './base.resolver';
import { BaseServiceImpl } from './base.service';
import { BaseView, BaseViewImpl, BaseViewOptions, FnRole, FnType } from './base.view';

export function BaseResolver<T extends Model>(ref: { new(): T } | BaseViewOptions<{ new(): T }>): { new(baseService: BaseServiceImpl<T>): Type } {
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

  const singleRef = (() => {
    i({
      name: 'resolver type ref',
      msg: classRef
    });
    return classRef.name.substring(0, classRef.name.length - 1);
  })();

  @InputType(`${singleRef}Input`)
  // @ts-ignore
  class InputTypeT extends PartialType(classRef) {
  }

  @InputType(`${singleRef}Info`)
  class InfoTypeT extends InfoType {
  }

  // @ts-ignore
  @ObjectType(`${classRef.name}PaginatedType`)
   // @ts-ignore
  class PaginatedType extends Paginated(classRef) {
  }

  @Resolver({ isAbstract: true })
  class BaseResolverHost extends BaseView<T> {
    constructor(baseService: BaseServiceImpl<T>) {
      super(baseService);
    }

    @GqlGate(FnType.CREATE, publicFns, roleFns)
     // @ts-ignore
    @Mutation(() => classRef, {
       // @ts-ignore
      name: `${classRef.name.toLowerCase()}`,
      nullable: false
    })
    override createOne(@Args('input', { type: () => InputTypeT }) data: InputTypeT): Promise<T> {
      return super.createOne({ ...data });
    }

    @GqlGate(FnType.FIND, publicFns, roleFns)
     // @ts-ignore
    @Query(() => classRef, {
      name: `${singleRef.toLowerCase()}`,
      nullable: true
    })
    override findOne(@Args('id', { type: () => Int }) id: number): Promise<T> {
      return super.findOne(id);
    }

    @GqlGate(FnType.FIND, publicFns, roleFns)
     // @ts-ignore
    @Query(() => PaginatedType, { name: `${classRef.name.toLowerCase()}` })
     // @ts-ignore
    override findAll(@Args() paginateInfo: PaginateDto): Promise<PaginatedType> {
      const info = { ...paginateInfo, filter: { ...paginateInfo.filter } };
       // @ts-ignore
      return super.findAll(info);
    }

    @GqlGate(FnType.DELETE, publicFns, roleFns)
    @Mutation(() => Boolean, {
       // @ts-ignore
      name: `removeMany${classRef.name}`,
      nullable: false
    })
    override removeMany(@Args('info', { type: () => InfoTypeT }) data: InfoTypeT): Promise<boolean> {
      return super.removeMany(data);
    }

    @GqlGate(FnType.UPDATE, publicFns, roleFns)
     // @ts-ignore
    @Mutation(() => classRef, {
      name: `patch${singleRef}`,
      nullable: false
    })
    override updateOne(@Args('id', { type: () => Int }) id: number, @Args('data', { type: () => InputTypeT }) data: any): Promise<T> {
      return super.updateOne(id, data);
    }

    @GqlGate(FnType.DELETE, publicFns, roleFns)
    @Mutation(() => Boolean, {
      name: `remove${singleRef}`,
      nullable: false
    })
    override remove(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
      return super.remove(id);
    }
  }

  function hideFn(name: string) {
    Object.defineProperty(BaseResolverHost.prototype, name, {
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
   // @ts-ignore
  return BaseResolverHost;
}
