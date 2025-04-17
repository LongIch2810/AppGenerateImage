import { Module } from '@nestjs/common';
import { FalaiController } from './falai.controller';
import { FalaiService } from './falai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FalaiController],
  providers: [FalaiService],
})
export class FalaiModule {}
