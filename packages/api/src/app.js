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

function triggerRedirect(res, key){
  return getLinks().then(links => {
    const dest = links[key];
    if (dest) {
      res.redirect(dest);
    } else {
      res.send('redirect not found for: ' + key);
    }
  });
}

app.get('/admin', (req, res) => {
  res.send('api admin page');
})

app.get('/:key', (req, res) => {
  const key = req.params.key;
  return triggerRedirect(res, key);
})

app.get('/', (req, res) => {
  return triggerRedirect(res, 'default');
})

module.exports = app
