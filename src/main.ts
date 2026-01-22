import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER_DOCS } from './shared/domain/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Centrotea Backend - Arcane Portal 🏮')
    .setDescription(
      'Centrotea sanctuary API for managing patients, professionals, workshops and evolutions',
    )
    .setVersion('1.0')
    .addTag(SWAGGER_DOCS.TAGS.AUTH, SWAGGER_DOCS.DESCRIPTIONS.AUTH.TAG)
    .addTag(SWAGGER_DOCS.TAGS.PATIENTS, SWAGGER_DOCS.DESCRIPTIONS.PATIENTS.TAG)
    .addTag(
      SWAGGER_DOCS.TAGS.PROFESSIONALS,
      SWAGGER_DOCS.DESCRIPTIONS.PROFESSIONALS.TAG,
    )
    .addTag(
      SWAGGER_DOCS.TAGS.WORKSHOPS,
      SWAGGER_DOCS.DESCRIPTIONS.WORKSHOPS.TAG,
    )
    .addTag(
      SWAGGER_DOCS.TAGS.EVOLUTIONS,
      SWAGGER_DOCS.DESCRIPTIONS.EVOLUTIONS.TAG,
    )
    .addTag(SWAGGER_DOCS.TAGS.PIA, SWAGGER_DOCS.DESCRIPTIONS.PIA.TAG)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Centrotea API - Documentação',
    customfavIcon: '🏮',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(3000);
  console.log('🏮 Centrotea Sanctuary started at: http://localhost:3000');
  console.log('📜 Documentation available at: http://localhost:3000/api/docs');
}
bootstrap();
