import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7000);
  console.log('Приложение запущено: http://localhost:7000');
}
bootstrap();
