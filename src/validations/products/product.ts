import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetProductsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  lang: string;

  @ApiProperty()
  page_number: string;

  @ApiProperty()
  limit: string;
}
export class GetProductsWithCategoryId {
  @IsNotEmpty()
  @ApiProperty()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  lang: string;

  @ApiProperty()
  page_number: string;

  @ApiProperty()
  limit: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;
}

export class DeleteProductDto {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}

export class UpdateActiveOfProductDto {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}
export class ShowOrderProductDto {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;
}

export class UpdateProductInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  description_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  description_ru: string;

  @ApiProperty()
  @IsNotEmpty()
  category_id: string;
}

export class GetRandomProductsDto {
  @ApiProperty()
  @IsNotEmpty()
  lang: string;
}
