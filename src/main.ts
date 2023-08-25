import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    //To allow requests from client
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1",
      "https://www.hellomyuni.com",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  };

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
  app.enableCors(corsOptions);
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
