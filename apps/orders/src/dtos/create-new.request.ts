import {
  IsNotEmpty,
  IsString,
  IsPositive,
  IsNumberString,
} from 'class-validator';

export class CreateNewRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;
}
