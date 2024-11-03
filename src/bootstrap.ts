// bootstrap.js
import { loadEnvFile } from 'node:process';

loadEnvFile();

import('./app.js').catch((err) => {
  console.error('Error starting app: ', err);
  process.exit(1);
});
