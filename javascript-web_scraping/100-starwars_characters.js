#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    if (response.statusCode === 200) {
      const movieData = JSON.parse(body);
      const charactersUrls = movieData.characters;

      // Function to fetch character names from their URLs
      charactersUrls.forEach((characterUrl) => {
        request.get(characterUrl, (error, response, body) => {
          if (error) {
            console.error(error);
          } else if (response.statusCode === 200) {
            const characterData = JSON.parse(body);
            console.log(characterData.name);
          }
        });
      });
    }
  }
});
