import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new I18nValidationPipe({ whitelist: true, transform: true }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

bootstrap();
