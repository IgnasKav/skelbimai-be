import { AdvertisementState } from '../entities/advertisement.entity';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class AdvertisementCreateRequestDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  description: string;

  @IsEnum(AdvertisementState)
  state: AdvertisementState;

  @IsString()
  city: string;

  @IsNumber()
  views: number;

  @IsNumber()
  price: number;

  @IsUUID()
  ownerId: string;

  @IsUUID()
  categoryId: string;
}
