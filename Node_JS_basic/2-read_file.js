const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

    // Séparation des lignes en utilisant le caractère de saut de ligne
    const lines = data.split('\n').filter((line, index) => index > 0 && line.trim() !== '');

    // Initialisation des compteurs
    let totalStudents = 0;
    const studentsByField = {};

    // Parcourir chaque ligne
    for (const line of lines) {
      const [firstname, , , field] = line.split(',');

      // Vérifier si le champ existe déjà dans studentsByField
      if (field in studentsByField) {
        studentsByField[field].count += 1;
        studentsByField[field].list.push(firstname);
      } else {
        studentsByField[field] = {
          count: 1,
          list: [firstname],
        };
      }

      // Incrémenter le compteur total d'étudiants
      totalStudents += 1;
    }

    console.log(`Number of students: ${totalStudents}`);

    // Afficher le nombre d'étudiants dans chaque champ
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        console.log(`Number of students in ${field}: ${studentsByField[field].count}. List: ${studentsByField[field].list.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
