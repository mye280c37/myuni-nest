import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true, 
      forbidNonWhitelisted : true,
      transform : true
    })
  );
  
  const isDev = process.env.MODE === 'dev' ? true : false;
  if (isDev) {
    const config = new DocumentBuilder()
      .setTitle('MyUni API')
      .setDescription('MyUni API description')
      .setVersion('2.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
