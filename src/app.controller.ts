import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('marker')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getallmarker')
  async getAllMarker() {
    try {
      const data = await this.appService.readFromJSON();
      if (data === null) {
        return { success: false, message: 'JSON file does not exist.' };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('addmarker')
  async addData(@Body() dataItem: any) {
    try {
      await this.appService.addData(dataItem);
      return { success: true, message: 'Data added.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post('deletemarker')
  async deleteData(@Body() data: any) {
    try {
      await this.appService.deleteData(data.id);
      return { success: true, message: 'Data deleted.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get('/download')
  async downloadData(@Res() res: Response) {
    const file = path.resolve(__dirname, '..', '', 'data.json');
    res.download(file);
  }
}
