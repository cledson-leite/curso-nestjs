import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryStub } from './mocks/userRepositoryStub';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/UserEmtity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe.only('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryStub],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('deve chamar o create com parametro corretos', () => {
    const createSpy = jest.spyOn(repository, 'create');
    const params = {
      name: 'qualquer coisa',
      email: 'qualquer@email.com',
      password: 'S3nh4!@#',
      role: 0,
    };
    service.create(params);
    expect(createSpy).toBeCalledWith(params);
  });
});
