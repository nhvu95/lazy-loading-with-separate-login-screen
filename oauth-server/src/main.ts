import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localdomain:7890', credentials: true});
  await app.listen(5000);
}
bootstrap();
