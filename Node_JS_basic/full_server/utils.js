// full_server/utils.js

const fs = require('fs').promises;

async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const processedData = {
      CS: { count: 0, list: [] },
      SWE: { count: 0, list: [] },
    };

    for (const line of lines) {
      const [firstname, , , field] = line.split(',');

      if (field === 'CS' || field === 'SWE') {
        processedData[field].count += 1;
        processedData[field].list.push(firstname);
      }
    }

    return processedData;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = { readDatabase };
