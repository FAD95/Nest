import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.validateBreed(createCatDto.breed);
    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
    });
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({ id })
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
    });
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({ id });
  }

  private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }
}
