import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequestDto } from './dto/searchRequest.dto';
import { AddToWatchLaterRequestDto } from './dto/addToWatchLaterRequest.dto';
import { AdvertisementEntity } from './entities/advertisement.entity';
import { Repository } from 'typeorm';
import { AdvertisementCreateRequestDto } from './dto/advertisementCreateRequest.dto';
import { AdvertisementUpdateRequestDto } from './dto/advertisementUpdateRequest.dto';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(AdvertisementEntity)
    private readonly advertisementsRepository: Repository<AdvertisementEntity>,
  ) {}

  searchAdvertisements(request: SearchRequestDto) {
    return request;
  }

  async getAdvertisementById(id: string) {
    const advertisement = await this.advertisementsRepository.findOne({
      where: { id: id },
    });

    if (!advertisement) {
      throw new NotFoundException(`Advertisement with id: ${id} not found`);
    }

    return advertisement;
  }

  createAdvertisement(request: AdvertisementCreateRequestDto) {
    const advertisement = this.advertisementsRepository.create(request);
    return this.advertisementsRepository.save(advertisement);
  }

  async updateAdvertisement(
    id: string,
    request: AdvertisementUpdateRequestDto,
  ) {
    const advertisement = await this.advertisementsRepository.preload({
      id: id,
      ...request,
    });

    if (!advertisement) {
      throw new NotFoundException(`Advertisement with id: ${id} not found`);
    }
    return this.advertisementsRepository.save(advertisement);
  }

  async deleteAdvertisement(id: string) {
    const advertisement = await this.getAdvertisementById(id);

    return this.advertisementsRepository.delete(advertisement);
  }

  addToWatchLater(id: string) {
    return id;
  }

  searchWatchLater(request: AddToWatchLaterRequestDto) {
    return request;
  }

  updateImage(image: any) {
    return image;
  }

  // for testing
  async getAll() {
    return await this.advertisementsRepository.find();
  }
}
