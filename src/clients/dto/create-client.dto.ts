import {
  IsEmail,
  IsInt,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClientDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  domain!: string;

  @Type(() => Number)
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  monthlyAmount!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(28)
  billingDay!: number;
}