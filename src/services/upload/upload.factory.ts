import { LocalService } from './local.service.js';
import { R2Service } from './r2.service.js';
import { IUploadService } from './upload.interface.js';

export class R2ServiceFactory {
  static getR2Service(): IUploadService {
    const environment = process.env.NODE_ENV || 'development';

    if (environment === 'production') return new R2Service();

    return new LocalService();
  }
}
