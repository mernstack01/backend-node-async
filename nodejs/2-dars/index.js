// index.js
import { log, readLogs } from './logger.js';

// Dastur ishga tushganda
log('APP STARTED');

// 2 soniyadan keyin
setTimeout(() => {
  log('FIRST TIMEOUT EVENT');
}, 2000);

// Interval: har 1 soniyada 3 marta
let count = 0;

const intervalId = setInterval(() => {
  count++;
  log('INTERVAL TICK');

  if (count === 3) {
    clearInterval(intervalId);
  }
}, 1000);

setTimeout(() => {
  const logs = readLogs();
  console.log('📄 LOGS.TXT CONTENT:\n');
  console.log(logs);
}, 6000);