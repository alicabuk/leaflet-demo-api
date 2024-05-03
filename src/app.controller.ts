import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
}
