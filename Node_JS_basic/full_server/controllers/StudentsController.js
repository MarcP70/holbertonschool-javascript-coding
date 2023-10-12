// full_server/controllers/StudentsController.js

const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const data = await readDatabase(req.databasePath);

      let responseMessage = 'This is the list of our students\n';
      for (const field in data) {
        if (Object.prototype.hasOwnProperty.call(data, field)) {
          responseMessage += `Number of students in ${field}: ${data[field].count}. List: ${data[field].list.join(', ')}\n`;
        }
      }
      res.status(200).send(responseMessage);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major.toUpperCase();
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const data = await readDatabase(req.databasePath);

      const responseMessage = `List of students in ${major}: ${data[major].list.join(', ')}`;

      res.status(200).send(responseMessage);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
    return null;
  }
}

module.exports = StudentsController;
