import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database/database.config';
import typeormConfig from '@config/typeorm/type.orm.config';
import openAiConfig from '@config/openai/open.ai.config';
import awsConfig from '@config/aws/aws.config';
import appConfig from './app.config';
import { AppConfigService } from './app.config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, typeormConfig, openAiConfig, awsConfig],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENVIRONMENT: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        APP_DEFAULT_ADMIN_USERNAME: Joi.string().email().required(),
        APP_DEFAULT_ADMIN_PASSWORD: Joi.string().min(8).required(),
        DATABASE_VENDOR: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        TYPE_ORM_POOL_SIZE: Joi.number().required(),
        TYPE_ORM_RETRY_ATTEMPTS: Joi.number().required(),
        TYPE_ORM_RETRY_DELAY: Joi.number().required(),
        TYPE_ORM_SYNCHRONIZE: Joi.boolean().required(),
        TYPE_ORM_LOGGING: Joi.boolean().required(),
        OPEN_AI_API_KEY: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_PROFILE: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
