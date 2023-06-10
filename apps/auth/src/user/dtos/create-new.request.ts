import { IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateNewRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
