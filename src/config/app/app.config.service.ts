import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get name() {
    return this.configService.get('app.name');
  }
  get environment() {
    return this.configService.get('app.environment');
  }
  get port() {
    return this.configService.get('app.port');
  }
  get defaultAdminUsername() {
    return this.configService.get('app.defaultAdminUsername');
  }
  get defaultAdminPassword() {
    return this.configService.get('app.defaultAdminPassword');
  }
}

export default () => ({
  name: process.env.APP_NAME,
  environment: process.env.APP_ENVIRONMENT,
  port: Number(process.env.APP_PORT),
  defaultAdminUsername: process.env.APP_DEFAULT_ADMIN_USERNAME,
  defaultAdminPassword: process.env.APP_DEFAULT_ADMIN_PASSWORD,
});
