import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/shared/public';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    logIn(@Body() loginDTO: {login: string, password: string}): Promise<{token: string}> {
        return this.authService.login(loginDTO);
    }
}
