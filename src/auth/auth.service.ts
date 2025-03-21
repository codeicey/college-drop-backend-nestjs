import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  
  private googleClient = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

  // For flutter
  generateToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateGoogleUser(user: any) {
    // Check if the user exists in DB, create if not
    // For now, return user directly
    return user;
  }

  // For web
  async validateOAuthLogin(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // For flutter friendly token verify

  async verifyGoogleToken(idToken: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: 'YOUR_GOOGLE_CLIENT_ID',
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Invalid Google token');

      // Optional: check if user exists or create a new user in DB
      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };
    } catch (error) {
      throw new UnauthorizedException('Google token verification failed');
    }
  }

  generateTokenFlutter(user: any) {
    return this.jwtService.sign({
      email: user.email,
      name: user.name,
    });
  }
}
