import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfigService {
  constructor(private readonly configService: ConfigService) {}
  get region() {
    return this.configService.get<string>('aws.region');
  }
  get profile() {
    return this.configService.get<string>('aws.profile');
  }
  get accessKeyId() {
    return this.configService.get<string>('aws.accessKeyId');
  }
  get secretAccessKey() {
    return this.configService.get<string>('aws.secretAccessKey');
  }
}

export default () => ({
  region: process.env.AWS_REGION,
  profile: process.env.AWS_PROFILE,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
