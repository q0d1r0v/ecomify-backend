// imports
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// export login dto class
export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
