import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new I18nValidationPipe({ whitelist: true, transform: true }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Entregas REST Api')
    .setDescription('Documentação dos recursos REST do Entregas')
    .setVersion('1.0')
    .addTag('entregas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
