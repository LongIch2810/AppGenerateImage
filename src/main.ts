import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Chỉ định nguồn hợp lệ (thay bằng domain của bạn)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức cho phép
    allowedHeaders: 'Content-Type, Authorization', // Các header được phép
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
