import { BaseRepository } from './BaseRepository';

export abstract class BaseService<T> {
  constructor(protected repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<T | null> {
    const item = await this.repository.findById(id);
    return item;
  }

  async create(data: any): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: any): Promise<T> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<T> {
    return this.repository.delete(id);
  }
}
