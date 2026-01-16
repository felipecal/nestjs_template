import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUserDto } from './dto/active-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/domain/user';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Performs user login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  async signIn(
    @GetUser() user: User,
    @Body() _signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login({
      userId: user.id,
      email: user.email,
    });

    response.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    response.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Login successful' };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refreshes the access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('refresh')
  async refreshToken(
    @GetUser() user: ActiveUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const oldRefreshToken = request.cookies['refreshToken'];
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { access_token, refresh_token } = await this.authService.refresh(
      user,
      oldRefreshToken,
    );

    response.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    response.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Token refreshed successfully' };
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registers a new user' })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict - Email already exists' })
  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Returns the authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@GetUser() userInput: ActiveUserDto) {
    const user = await this.usersService.findById(userInput.userId.toString());
    if (user) {
      return new UserResponseDto(user);
    }
    return null;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 204, description: 'Logout successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @GetUser() user: ActiveUserDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const refreshToken = (request as any).cookies['refreshToken'];
    if (refreshToken) {
      await this.authService.logout(user, refreshToken);
    }

    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    return;
  }
}
