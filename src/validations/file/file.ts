import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty()
  files: string;

  @ApiProperty()
  product_id?: number;

  @ApiProperty()
  category_id?: number;

  @ApiProperty()
  is_banner?: boolean;
}
