import { fal } from '@fal-ai/client';
import { Injectable, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class FalaiService {
  private falai_apiKey: string;
  private rapid_apiKey: string;
  constructor(configService: ConfigService) {
    this.falai_apiKey = configService.get<string>('FAL_AI_API_KEY') || '';
    this.rapid_apiKey =
      configService.get<string>('RAPID_TRANSLATE_API_KEY') || '';
    fal.config({
      credentials: this.falai_apiKey,
    });
  }

  async generateImage(prompt: string) {
    const options = {
      method: 'POST',
      url: 'https://openl-translate.p.rapidapi.com/translate/bulk',
      headers: {
        'x-rapidapi-key': this.rapid_apiKey,
        'x-rapidapi-host': 'openl-translate.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        target_lang: 'en',
        text: [prompt],
      },
    };

    try {
      const resTranslate = await axios.request(options);
      console.log(resTranslate.data);
      const translatedText = resTranslate.data?.translatedTexts[0];
      console.log('>>> translate : ', translatedText);
      const result = await fal.subscribe('fal-ai/flux/dev', {
        input: {
          prompt: translatedText,
          num_images: 1,
        },
      });
      return result.data.images;
    } catch (error) {
      console.error(error);
      throw new Error('call api failed generate image with fal ai');
    }
  }
}
