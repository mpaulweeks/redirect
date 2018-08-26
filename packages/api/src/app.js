'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(bodyParser.json()); // support json encoded POST bodies

// response helpers

function addLink(res, key, value) {
  store.getLinks().then(links => {
    links[key] = value;
    if (!value) {
      delete links[key];
    }
    return store.putLinks(links).then(() => {
      res.send(JSON.stringify(links));
    });
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function viewLinks(res) {
  store.getLinks().then(links => {
    res.send(JSON.stringify(links));
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function triggerRedirect(res, key){
  return store.getLinks().then(links => {
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
