import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeTokenDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
