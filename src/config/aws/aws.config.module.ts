import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsConfigService } from './aws.config.service';
import awsConfig from './aws.config';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [AwsConfigService],
  exports: [AwsConfigService],
})
export class AwsConfigModule {}
