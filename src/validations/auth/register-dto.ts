// imports
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// export register dto class
export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  full_name: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  register_secret_key: string;
}
