import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getApiInfo(): string {
    return (
      this.configService.get<string>('SWAGGER_TITLE') +
      ' ' +
      this.configService.get<string>('SWAGGER_VERSION') +
      '\n' +
      this.configService.get<string>('SWAGGER_DESCRIPTION')
    );
  }
}
