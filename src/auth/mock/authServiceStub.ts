import { AuthService } from '../auth.service';

export const userFake = {
  id: 1,
  name: 'qualquer coisa',
  email: 'qulaquer@email.com',
  password: 'qualquer-senha',
  role: 1,
  createdAt: 'qulauqer data',
  updatedAt: 'qulauqer data',
};

export const authServiceStub = {
  provide: AuthService,
  useValue: {
    create: jest.fn(),
    verify: jest.fn(),
    signUp: jest.fn(),
    login: jest.fn(),
    forget: jest.fn(),
    reset: jest.fn(),
    getMe: jest.fn((userFake) => userFake),
  },
};
