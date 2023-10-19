import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('zitadel-jwt')
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Not authorized' })
@Controller({ path: 'app', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
