import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/UserEmtity';

export const userRepositoryStub = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
