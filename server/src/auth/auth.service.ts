import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async guestLogin() {
    const nanoid = Math.random().toString(36).substring(2, 9);
    const user = await this.usersService.create({
      name: `Guest_${nanoid}`,
      isGuest: true,
    });

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
