import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType('LoginInput')
export class LoginInput {
  @Field()
  @IsEmail(
    {},
    { message: 'Por favor, forneça um endereço de email sagrado válido' },
  )
  @IsNotEmpty({ message: 'O email é um encantamento obrigatório' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'A senha é a chave do portal, não pode estar vazia' })
  @MinLength(6, { message: 'A chave deve ter no mínimo 6 runas (caracteres)' })
  password: string;
}
