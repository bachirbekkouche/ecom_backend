export interface BaseRepositoryInterface<
  T,
  CreateInput = any,
  UpdateInput = any,
> {
  create(data: CreateInput): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  update(id: number, data: UpdateInput): Promise<T>;
  remove(id: number): Promise<T>;
}
