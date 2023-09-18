#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    if (response.statusCode === 200) {
      const filmsData = JSON.parse(body);
      const wedgeAntillesFilms = filmsData.results.filter(film => {
        return film.characters.includes('https://swapi-api.hbtn.io/api/people/18/');
      });
      console.log(wedgeAntillesFilms.length);
    } else {
      console.log('Unable to retrieve movie data.');
    }
  }
});
