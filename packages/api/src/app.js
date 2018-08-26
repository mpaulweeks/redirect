'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
const s3 = new AWS.S3();
const s3Config = {
  Bucket: 'mpaulweeks-redirect',
  Key: 'links.json',
}

// s3 handlers

function s3getLinks() {
  // https://s3.amazonaws.com/mpaulweeks-redirect/links.json
  return new Promise((resolve, reject) => {
    s3.getObject({
      ...s3Config,
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to retrieve an object: ' + error);
        reject(error);
      } else {
        const links = JSON.parse(data.Body.toString());
        resolve(links);
      }
    });
  });
}

function s3putLinks(links) {
  // https://s3.amazonaws.com/mpaulweeks-redirect/links.json
  return new Promise((resolve, reject) => {
    s3.putObject({
      ...s3Config,
      Body: JSON.stringify(links, null, 2),
    }, (error, data) => {
      if (error != null) {
        console.log('Failed to put an object: ' + error);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// response handlers

function addLink(res, key, value) {
  s3getLinks().then(links => {
    links[key] = value;
    if (!value) {
      delete links[key];
    }
    return s3putLinks(links).then(() => {
      res.send(JSON.stringify(links));
    });
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function viewLinks(res) {
  s3getLinks().then(links => {
    res.send(JSON.stringify(links));
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function triggerRedirect(res, key){
  return s3getLinks().then(links => {
    const dest = links[key];
    if (dest) {
      res.redirect(dest);
    } else {
      res.send('redirect not found for: ' + key);
    }
  }).catch(error => {
    res.send('error: ' + error);
  });
}

// routes

app.get('/admin', (req, res) => {
  // todo serve fe
  res.send('api admin page');
})

app.get('/api', (req, res) => {
  return viewLinks(res);
})

app.post('/api', (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  return addLink(res, key, value);
})

app.get('/:key', (req, res) => {
  const key = req.params.key;
  return triggerRedirect(res, key);
})

app.get('/', (req, res) => {
  return triggerRedirect(res, 'default');
})

module.exports = app
