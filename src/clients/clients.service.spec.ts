import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';

const ClientArray = [
  {
    name: 'firstName #1',
    email: 'hello@test.de',
    togglWorkspaceId: 12345,
  },
  {
    name: 'firstName #2',
    email: 'hello@test.de',
    togglWorkspaceId: 12345,
  },
];

const oneClient = {
  name: 'firstName #1',
  email: 'hello@test.de',
  togglWorkspaceId: 12345,
};

describe('ClientService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            find: jest.fn().mockResolvedValue(ClientArray),
            findOneBy: jest.fn().mockResolvedValue(oneClient),
            save: jest.fn().mockResolvedValue(oneClient),
            create: jest.fn().mockReturnValue(oneClient),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a Client', () => {
      const oneClient = {
        name: 'firstName #1',
        email: 'hello@test.de',
        togglWorkspaceId: 12345,
      };

      expect(
        service.create({
          name: 'firstName #1',
          email: 'hello@test.de',
          togglWorkspaceId: 12345,
        }),
      ).resolves.toEqual(oneClient);
    });
  });

  describe('findAll()', () => {
    it('should return an array of Clients', async () => {
      const Clients = await service.findAll();
      expect(Clients).toEqual(ClientArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single Client', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(oneClient);
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.delete(2);
      expect(removeSpy).toHaveBeenCalledWith(2);
      expect(retVal).toBeUndefined();
    });
  });
});
