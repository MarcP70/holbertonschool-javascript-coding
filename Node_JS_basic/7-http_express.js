const express = require('express');
const fs = require('fs');

const app = express();
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

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  readDatabase(databasePath)
    .then((data) => {
      res.send(`This is the list of our students\n${data}`);
    })
    .catch(() => {
      res.send('This is the list of our students\nCannot load the database');
    });
});

app.listen(1245);

module.exports = app;
