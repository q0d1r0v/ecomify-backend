import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
