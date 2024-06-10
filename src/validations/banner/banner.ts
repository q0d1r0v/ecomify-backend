import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  banner_id: number;
}
