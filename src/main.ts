import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const documentConfiguration = new DocumentBuilder()
    .setTitle('Wellness Mate - Restful API')
    .setDescription(
      'Welcome to the Wellness Mate API. This application is designed to provide personalized health and wellness suggestions to patients based on their medical history. By leveraging cutting-edge Artificial Intelligence (AI) technologies, particularly Large Language Models (LLMs) and ChatBots like OpenAI (GPT) and AWS Bedrock (Nova Micro), Wellness Mate offers insightful recommendations to help guide patients in managing their health. \n\n' +
        'All API endpoints are secured with JWT Bearer Token authentication to ensure that only authorized users can access sensitive data. The API is designed to be simple, scalable, and easy to integrate with your healthcare systems.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .setContact(
      'Angel Hincho',
      'https://github.com/ahincho',
      'ahincho@unsa.edu.pe',
    )
    .setTermsOfService('https://github.com/ahincho/wellness-mate')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    documentConfiguration,
  );
  SwaggerModule.setup('/api/v1/docs/', app, swaggerDocument);
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  };
  app.enableCors(corsOptions);
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
