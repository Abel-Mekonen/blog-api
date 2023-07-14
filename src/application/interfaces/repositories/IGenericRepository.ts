import mongoose from "mongoose";

export interface IGenericRepository<T> {
  Create(entity: T): Promise<T>;
  GetAll(): Promise<T[]>;
  GetById(id: mongoose.Types.ObjectId,): Promise<T>;
  Update(id: mongoose.Types.ObjectId, entity: T): Promise<T>;
  Delete(id: mongoose.Types.ObjectId,): Promise<void>;
}
