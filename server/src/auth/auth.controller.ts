import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExchangeTokenDto } from './dto/exchange-token.dto';
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async exchangeCodeForTokens(@Body() exchangeTokenDto: ExchangeTokenDto) {
    try {
      return await this.authService.exchangeCodeForTokens(exchangeTokenDto.code);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('refresh')
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
        await this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
        return { accessToken: this.authService.getAccessToken() };
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

}
