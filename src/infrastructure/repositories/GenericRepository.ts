import { IGenericRepository } from "@interfaces/repositories/IGenericRepository";
import mongoose from "mongoose";
import { IBaseEntity } from "@entities/BaseEntity";

export abstract class GenericRepository<T extends IBaseEntity>
  implements IGenericRepository<T>
{
  protected _schema: mongoose.Model<T>;

  constructor( schema: mongoose.Model<T>) {
    this._schema = schema;
  }

  async Create(entity: T): Promise<T> {
    const entityCreate = this._schema.create(entity);
    return entityCreate;
  }
  async GetAll(): Promise<T[]> {
    const entities = this._schema.find();
    return entities;
  }

  async GetById(id: mongoose.Types.ObjectId,): Promise<T> {
    const entity = this._schema.findById(id);
    return entity;
  }

  async Update(id: mongoose.Types.ObjectId, entity: T): Promise<T> {
    await this._schema.findByIdAndUpdate(id, entity)
    return entity;
  }

  async Delete(id: mongoose.Types.ObjectId,): Promise<void> {
    this._schema.findByIdAndDelete(id);
  }
}
