import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => {
  return await open({
    filename: './src/database/bgames.db',
    driver: sqlite3.Database,
  });
};
