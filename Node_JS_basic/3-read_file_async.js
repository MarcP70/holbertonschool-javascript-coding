const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line, index) => index > 0 && line.trim() !== '');

        let totalStudents = 0;
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

          totalStudents += 1;
        }

        console.log(`Number of students: ${totalStudents}`);

        for (const field in studentsByField) {
          if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
            console.log(`Number of students in ${field}: ${studentsByField[field].count}. List: ${studentsByField[field].list.join(', ')}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
