import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDb() {
  return await open({
    filename: '/tmp/bgames.db',
    driver: sqlite3.Database,
  });
}
