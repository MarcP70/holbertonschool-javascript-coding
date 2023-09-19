#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode === 200) {
    const movieData = JSON.parse(body);
    const charactersUrls = movieData.characters;

    // Start after function declaration

    // Function to fetch and print character names in order
    const fetchAndPrintCharacterNames = (urls, index) => {
      if (index >= urls.length) {
        return; // Stop recursion when all characters are printed
      }

      request.get(urls[index], (error, response, body) => {
        if (error) {
          console.error(error);
        } else if (response.statusCode === 200) {
          const characterData = JSON.parse(body);
          console.log(characterData.name);
          // Recursive call for the next character
          fetchAndPrintCharacterNames(urls, index + 1);
        } else {
          // Recursive call for the next character even on failure
          fetchAndPrintCharacterNames(urls, index + 1);
        }
      });
    };
    // Start fetching and printing characters
    fetchAndPrintCharacterNames(charactersUrls, 0);
  }
});
