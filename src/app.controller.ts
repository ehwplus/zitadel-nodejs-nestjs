import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth('zitadel-jwt')
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Not authorized' })
@UseGuards(AuthGuard('zitadel'))
@Controller({ path: 'app', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
