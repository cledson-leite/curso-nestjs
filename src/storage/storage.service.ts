import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class StorageService {
  private storage: string;
  async upload(id: number, file: Express.Multer.File): Promise<void> {
    this.storage = join(__dirname, '..', '..', 'storage', `avatar-${id}.png`);
    writeFile(this.storage, file.buffer);
  }
}
