import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  additional_phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}

export class DoneOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;
}

export class GetActiveOrdersDto {
  @ApiProperty()
  @IsNotEmpty()
  page_number: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;
}

export class GetOrdersWithIdDto {
  @ApiProperty()
  @IsNotEmpty()
  order_id: number;
}
