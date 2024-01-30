import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // Setup Swagger (OpenAPI), available at /api
  const config = new DocumentBuilder()
    .setTitle('Metzomatic')
    .setDescription('Automations for me')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validate incoming requests with class-validator using the modules dto's
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
