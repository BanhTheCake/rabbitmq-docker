import {
  IsOptional,
  IsString,
  IsPositive,
  IsNumberString,
} from 'class-validator';

export class UpdateOneRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumberString()
  phoneNumber?: string;
}
