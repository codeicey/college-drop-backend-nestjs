import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  // @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return { message: 'Redirecting to Google OAuth2' };
  }

  @Get('google/redirect')
  // @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req) {
    return this.authService.validateOAuthLogin(req.user);
  }

  // For flutter

  @Get('googleflutter')
  // @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  async googleAuthRedirectFlutter(@Req() req, @Res() res) {
    const user = await this.authService.validateGoogleUser(req.user);
    const token = this.authService.generateToken(user);
    // Redirect to Flutter app with token
    res.redirect(`your-flutter-app-scheme://login?token=${token}`);
  }
    // Flutter sends idToken here
    @Post('googleflutter/token-login')
    async googleFlutterTokenLogin(@Body('idToken') idToken: string) {
      const user = await this.authService.verifyGoogleToken(idToken);
      const token = this.authService.generateTokenFlutter(user); // Generate your app's JWT token
      return { accessToken: token, user };
    }
}
