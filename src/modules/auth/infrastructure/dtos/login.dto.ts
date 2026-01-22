import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SWAGGER_DOCS } from '../../../../shared/domain/constants/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email for authentication',
    example: SWAGGER_DOCS.EXAMPLES.AUTH.EMAIL,
  })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: SWAGGER_DOCS.EXAMPLES.AUTH.PASSWORD,
    minLength: 6,
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
