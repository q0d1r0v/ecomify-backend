// imports
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

// export login dto class
export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsNotEmpty()
  @ApiProperty()
  full_name: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class DeleteUserDto {
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;
}

export class GetUsersDto {
  @ApiProperty()
  user_name?: string;
}
