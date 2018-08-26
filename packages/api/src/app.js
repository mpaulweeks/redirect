'use strict'

const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const s3 = new AWS.S3();

function getLinks(res) {
  // 'https://s3.amazonaws.com/mpaulweeks-redirect/links.json'
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: 'mpaulweeks-redirect',
      Key: 'links.json',
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to retrieve an object: ' + error);
        reject(error);
      } else {
        const links = JSON.parse(data.Body.toString());
        resolve(links);
      }
    });
  }).catch(error => {
    res.send('error: ' + error);
  });
}

app.get('/', (req, res) => {
  getLinks().then(links => {
    res.send('api hello world: ' + JSON.stringify(links))
  });
})

module.exports = app
