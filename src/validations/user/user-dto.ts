// imports
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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

export class GetUsersDto {
  @ApiProperty()
  user_name?: string;

  @ApiProperty()
  @IsNotEmpty()
  page_number: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;
}
