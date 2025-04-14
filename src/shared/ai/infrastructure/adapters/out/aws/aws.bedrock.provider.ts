import { Provider } from '@nestjs/common';
import { AwsConfigService } from '@config/aws/aws.config.service';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { AwsCredentialIdentity } from '@aws-sdk/types';

export const AwsBedrockProvider: Provider = {
  provide: BedrockRuntimeClient,
  useFactory: (awsConfigService: AwsConfigService) => {
    const credentials: AwsCredentialIdentity = {
      accessKeyId: awsConfigService.accessKeyId!,
      secretAccessKey: awsConfigService.secretAccessKey!,
    };
    return new BedrockRuntimeClient({
      region: awsConfigService.region!,
      credentials,
    });
  },
  inject: [AwsConfigService],
};
