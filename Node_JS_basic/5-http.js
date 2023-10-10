const http = require('http');
const fs = require('fs');

const databasePath = process.argv[2];

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line, index) => index > 0 && line.trim() !== '');

        let studentsOutput = '';

        const studentsByField = {};
        for (const line of lines) {
          const [firstname, , , field] = line.split(',');

          if (field in studentsByField) {
            studentsByField[field].count += 1;
            studentsByField[field].list.push(firstname);
          } else {
            studentsByField[field] = {
              count: 1,
              list: [firstname],
            };
          }
        }

        studentsOutput += `Number of students: ${Object.keys(studentsByField).reduce((acc, field) => acc + studentsByField[field].count, 0)}\n`;

        for (const field in studentsByField) {
          if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
            studentsOutput += `Number of students in ${field}: ${studentsByField[field].count}. List: ${studentsByField[field].list.join(', ')}\n`;
          }
        }

        resolve(studentsOutput);
      }
    });
  });
}

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    // Read the database and send its content
    readDatabase(databasePath)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch(() => {
        res.end('This is the list of our students\nCannot load the database');
      });
  } else {
    res.end('Invalid URL');
  }
});

app.listen(1245);

module.exports = app;
