import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export const getSwaggerPath = (
  configService: ConfigService<unknown, boolean>,
) => configService.get<string>('SWAGGER_PATH');

export const getSwaggerConfig = (
  configService: ConfigService<unknown, boolean>,
): Omit<OpenAPIObject, 'paths'> =>
  new DocumentBuilder()
    .setTitle(configService.get<string>('SWAGGER_TITLE'))
    .setDescription(configService.get<string>('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get<string>('SWAGGER_VERSION'))
    .addTag('companies', 'Компании')
    .addTag('company-categories', 'Категории компаний')
    .addTag('contact-face-positions', 'Должности контактных лиц')
    .addTag('contact-faces', 'Контактные лица')
    .addTag('contact-offers', 'Предложения контактов')
    .addTag('contacts', 'Контакты')
    .addTag('managers', 'Менеджеры')
    .addTag('root')
    .build();

export const setupSwagger = (app: INestApplication<any>): void => {
  const configService = app.get(ConfigService);
  const path = getSwaggerPath(configService);
  const config = getSwaggerConfig(configService);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document);
};
