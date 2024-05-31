import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('ECOMIFY backend api docs')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('ECOMIFY docs')
    .build();
  const options = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
