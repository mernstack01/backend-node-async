import http from 'http';

let idCounter = 3;

const students = [
  { id: 1, name: 'Ali', age: 15 },
  { id: 2, name: 'Laylo', age: 14 },
];

const stats = {
  totalRequests: 0,
  studentsCount: students.length,
  lastRequestTime: null,
};

function onRequestStart(req) {
  stats.totalRequests++;
  stats.studentsCount = students.length;
  stats.lastRequestTime = new Date().toISOString();

  console.log(`[REQUEST] ${req.method} ${req.url}`);
}

const server = http.createServer((req, res) => {
  onRequestStart(req);

  if (req.method === 'GET' && req.url === '/students') {
    console.log('[GET /students] HANDLER START');

    setTimeout(() => {
      console.log('[GET /students] TIMEOUT CALLBACK');

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({ students }));
    }, 500);

    return;
  }

  if (req.url === '/students') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'METHOD NOT ALLOWED' }));
      return;
    }

    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      let parsedBody;

      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'INVALID JSON' }));
        return;
      }

      const newStudent = {
        id: idCounter++,
        name: parsedBody.name,
        age: parsedBody.age,
      };

      students.push(newStudent);

      setImmediate(() => {
        console.log('[POST /students] AFTER PARSING BODY (setImmediate)');
      });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ students }));
    });

    return;
  }

  if (req.method === 'GET' && req.url === '/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'NOT FOUND' }));
});

server.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});