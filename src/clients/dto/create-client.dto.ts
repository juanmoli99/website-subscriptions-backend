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
  @IsString({
    message: 'El nombre es obligatorio.',
  })
  name!: string;

  @IsEmail(
    {},
    {
      message: 'El email no es válido.',
    },
  )
  email!: string;

  @IsString({
    message: 'El dominio es obligatorio.',
  })
  domain!: string;

  @Type(() => Number)
  @IsNumber(
    {
      maxDecimalPlaces: 2,
    },
    {
      message: 'El monto mensual debe ser un número válido.',
    },
  )
  @Min(15, {
    message: 'El monto mensual mínimo es de $15.',
  })
  monthlyAmount!: number;

  @Type(() => Number)
  @IsInt({
    message: 'El día de cobro debe ser un número entero.',
  })
  @Min(1, {
    message: 'El día de cobro debe ser mayor a 0.',
  })
  @Max(28, {
    message: 'El día de cobro no puede ser mayor a 28.',
  })
  billingDay!: number;
}