import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon raqami noto‘g‘ri formatda' })
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @ApiProperty()
  @IsOptional()
  role: string;
}
export class AuthLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^\+998[0-9]{9}$/, { message: 'Telefon raqami noto‘g‘ri formatda' })
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
