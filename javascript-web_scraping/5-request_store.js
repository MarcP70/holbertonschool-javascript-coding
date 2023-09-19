#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const apiUrl = process.argv[2];
const filePath = process.argv[3];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode === 200) {
    fs.writeFile(filePath, body, 'utf-8', (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
});
