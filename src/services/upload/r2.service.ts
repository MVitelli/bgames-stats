import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { IUploadService } from './upload.interface.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class R2Service implements IUploadService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const {
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME = 'local-bucket',
      R2_ENDPOINT,
    } = process.env;

    if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT)
      throw new Error('Missing required environment variables');

    this.bucketName = R2_BUCKET_NAME;

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  async generateSignedUrl(
    key: string,
    expiresIn: number = 300,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
    return signedUrl;
  }

  async uploadObject(
    key: string,
    data: Buffer | Uint8Array | Blob,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: data,
    });

    await this.s3Client.send(command);
  }
}
