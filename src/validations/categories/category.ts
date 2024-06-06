import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  name_ru: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty()
  @IsNotEmpty()
  name_ru: string;
}

export class GetCategoriesDto {
  @ApiProperty()
  @IsNotEmpty()
  lang: string;
}

export class DeleteCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  category_id: number;
}
