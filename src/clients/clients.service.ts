import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    const newClient = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(newClient);
  }

  findAll() {
    return this.clientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) throw new NotFoundException(`Client #${id} not found`);
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const updatedClient = await this.clientRepository.preload({
      id,
      ...updateClientDto,
    });
    if (!updatedClient) throw new NotFoundException(`Client #${id} not found`);
    return this.clientRepository.save(updatedClient);
  }

  delete(id: number) {
    return this.clientRepository.delete(id);
  }
}
