import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private readonly filename = 'data.json';

  async readFromJSON() {
    try {
      if (!fs.existsSync(this.filename)) {
        return [];
      }
      const jsonData = fs.readFileSync(this.filename, 'utf-8');
      return JSON.parse(jsonData);
    } catch (error) {
      throw new Error(`Error reading from JSON file: ${error.message}`);
    }
  }

  async writeToJSON(data: any): Promise<void> {
    try {
      for (let index = 0; index < data.length; index++) {
        if (data.id) {
          data[index].id = index + 1;
        }
      }
      const jsonData = JSON.stringify(data);
      fs.writeFileSync(this.filename, jsonData);
    } catch (error) {
      throw new Error(`Error writing to JSON file: ${error.message}`);
    }
  }

  async addData(dataItem: any): Promise<void> {
    const dataArray = await this.readFromJSON();
    const lastId =
      dataArray.length > 0 ? dataArray[dataArray.length - 1].id : 0;
    dataItem.id = lastId + 1;
    dataArray.push(dataItem);
    await this.writeToJSON(dataArray);
  }

  async deleteData(id: number): Promise<void> {
    const dataArray = await this.readFromJSON();
    const newDataArray = dataArray.filter((item) => item.id !== id);
    await this.writeToJSON(newDataArray);
  }
}
