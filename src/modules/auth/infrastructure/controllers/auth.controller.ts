import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginDto } from '../dtos/login.dto';
import {
  SWAGGER_DOCS,
  swaggerSuccess,
  swaggerError,
} from '../../../../shared/domain/constants';

@ApiTags(SWAGGER_DOCS.TAGS.AUTH)
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: SWAGGER_DOCS.DESCRIPTIONS.AUTH.LOGIN })
  @ApiResponse(swaggerSuccess(200))
  @ApiResponse(swaggerError('Credenciais')[401])
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
