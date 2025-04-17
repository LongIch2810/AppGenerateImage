import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { FalaiService } from './falai.service';

@Controller('falai')
export class FalaiController {
  constructor(private readonly falaiService: FalaiService) {}
  @Post('generate-image')
  async main(@Body() body: any) {
    if (!body.prompt) {
      throw new BadRequestException('Vui lòng nhập prompt của bạn !');
    }
    return this.falaiService.generateImage(body.prompt);
  }
}
