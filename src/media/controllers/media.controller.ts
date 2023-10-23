import { Controller, Get, Param, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  @Get('pictures/:path')
  async getPicture(@Param('path') path: string, @Res() res: Response) {
    // return readFile(`${process.cwd()}/media/pictures/${path}`, 'utf-8');

    const file = createReadStream(
      join(process.cwd(), `/media/pictures/${path}`),
    );

    file.pipe(res);
  }
}
