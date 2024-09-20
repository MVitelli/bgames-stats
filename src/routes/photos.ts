import { Router, Request, Response } from 'express';
import { R2ServiceFactory } from '../services/upload/upload.factory.js';

const photos: Router = Router();

const uploadService = R2ServiceFactory.getR2Service();

photos.post('/signed-url', async (req: Request, res: Response) => {
  const { filename } = req.body;
  const signedUrl = await uploadService.generateSignedUrl(filename);

  res.send(signedUrl);
});

photos.post('/', async (_req: Request, _res: Response) => {});

export { photos };
