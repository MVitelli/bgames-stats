export interface IUploadService {
  generateSignedUrl(key: string, expiresIn?: number): Promise<string>;
  uploadObject(key: string, data: Buffer | Uint8Array | Blob): Promise<void>;
}
