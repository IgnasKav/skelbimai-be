import { Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementEntity } from './entities/advertisement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdvertisementEntity])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule {}
