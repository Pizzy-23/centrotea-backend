import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import { LoginDto } from '../../infrastructure/dtos/login.dto';
import { MESSAGES } from '../../../../shared/domain/constants/messages';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(MESSAGES.AUTH.LOGIN_ERROR);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.AUTH.LOGIN_ERROR);
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role,
      name: user.name 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
    };
  }
}
