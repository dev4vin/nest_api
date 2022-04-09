import { Model } from '@dev4vin/nest_data';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface ModelActions extends Model {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}

export type UIDModel = {
    uId?: string;
}

export type SoftDeleteModel = {
    deletedAt?: Date;
}

export abstract class BaseModelImpl extends BaseEntity implements UIDModel, SoftDeleteModel, ModelActions {
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    uId?: string | undefined;
    deletedAt?: Date | undefined;
}

export class BaseModel extends BaseModelImpl {
    that: any;
    constructor() {
        super();
        this.that = this;
    }
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    override id?: number | undefined;
    @Column('datetime', {
        name: 'created_at',
        nullable: true,
        default: () => "'current_timestamp(3)'"
    })
    override createdAt?: Date | undefined;
    @Column('datetime', { name: 'updated_at', nullable: true })
    override updatedAt?: Date | undefined;
    @Column('varchar', { name: 'u_id', length: 191 })
    override uId?: string | undefined;
    @Column('datetime', { name: 'deleted_at', nullable: true })
    override deletedAt?: Date | undefined;
}
