// logger.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname ni ES Module’da olish
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// logs.txt to‘liq yo‘li
const logFilePath = path.join(__dirname, 'logs.txt');

// vaqtni ISO formatda olish
function getTimestamp() {
  return new Date().toISOString();
}

// LOG(message)
export function log(message) {
  const line = `${getTimestamp()} - ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, line, { encoding: 'utf-8' });
  } catch (err) {
    console.error('❌ Log yozishda xatolik:', err.message);
  }
}

// READLOGS()
export function readLogs() {
  try {
    const data = fs.readFileSync(logFilePath, 'utf-8');
    return data;
  } catch (err) {
    console.error('❌ Loglarni o‘qishda xatolik:', err.message);
    return '';
  }
}