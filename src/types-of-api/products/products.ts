// imports
import { ApiProperty } from '@nestjs/swagger';

export class TypesOfGetProducts {
  @ApiProperty()
  page_number: number;

  @ApiProperty()
  name: string;
}
