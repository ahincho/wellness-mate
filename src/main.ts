import { NestFactory, Reflector } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '@auth/guards/jwt.auth.guard';
import { SpelunkerModule } from 'nestjs-spelunker';
import { AppModule } from './app.module';
import * as fs from 'fs';

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
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  };
  app.enableCors(corsOptions);
  const port = configService.get<number>('APP_PORT') || 3000;
  if (configService.get<string>('APP_ENVIRONMENT') === 'development') {
    void generateDependencyGraph(app);
  }
  await app.listen(port);
}
bootstrap();

async function generateDependencyGraph(app: INestApplication) {
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges
    .map(({ from, to }) => `  ${from.module.name}-->${to.module.name}`)
    .filter(
      (edge) =>
        !edge.includes('FilteredModule') && !edge.includes('OtherExample'),
    )
    .sort();
  fs.writeFileSync(
    'deps.mermaid',
    `graph LR
      ${mermaidEdges.join('\n')}`,
  );
}
