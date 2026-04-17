import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest JS Course API')
    .setDescription('API doc for Nest JS Course')
    .setVersion('1.0.0')
    .setContact('Pavel', 'https://example.com', 'support@example.com')
    .setExternalDoc('yaml', 'swagger.yaml')
    .setExternalDoc('json', 'swagger.json')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
  });

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: 'swagger.json',
    yamlDocumentUrl: 'swagger.yaml',
    customSiteTitle: 'Nest JS Course API',
  });

  app.use(logger);

  await app.listen(3000);
}
bootstrap();
