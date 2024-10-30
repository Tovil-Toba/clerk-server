import { Controller, Get } from '@nestjs/common';
import { ApiFoundResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiTags('root')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiFoundResponse({ description: 'API info' })
  getApiInfo(): string {
    return this.appService.getApiInfo();
  }
}
