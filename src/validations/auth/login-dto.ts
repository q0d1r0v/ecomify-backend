// imports
import { IsNotEmpty } from 'class-validator';

// export login dto class
export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string | number;
}
