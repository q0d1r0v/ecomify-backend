// imports
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

// export login dto class
export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  new_username: string;

  @IsNotEmpty()
  @ApiProperty()
  new_password: string;
}

export class DeleteUserDto {
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;
}
