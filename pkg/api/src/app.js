'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

const app = express();
app.use(bodyParser.json()); // support json encoded POST bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// response helpers

const BLACKLIST = [
  'about', // serves html
  'admin', // serves html
  'api',
  'error', // serves html
];

function renderFrontend(req, res){
  const isDev = req.hostname.includes('localhost');
  // todo if (isDev), use local assets
  store.getIndex().then(html => {
    const assetBase = 'https://s3.amazonaws.com/mpaulweeks-redirect/fe';
    const formatted = html.split('[ROOT]').join(assetBase);
    res.send(formatted);
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function addLink(req, res, key, value) {
  store.getLinks().then(links => {
    links[key] = value;
    if (!value || BLACKLIST.includes(key)) {
      delete links[key];
    }
    return store.putLinks(links).then(newLinks => {
      res.send(JSON.stringify(newLinks));
    });
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function viewLinks(req, res) {
  store.getLinks().then(links => {
    res.send(JSON.stringify(links));
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function tryRedirect(req, res, key){
  store.getLinks().then(links => {
    const dest = links[key];
    if (dest) {
      res.redirect(dest);
    } else {
      renderFrontend(req, res);
    }
  }).catch(error => {
    res.send('error: ' + error);
  });
}

function verifyPassword(password){
  function hashInput(str) {
    // https://stackoverflow.com/a/8831937/6461842
    var hash = 0;
    if (!str || str.length === 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  return hashInput(password) === 1265856690;
}

// routes

app.get('/about', (req, res) => {
  renderFrontend(req, res);
})
app.get('/admin', (req, res) => {
  renderFrontend(req, res);
})
app.get('/error', (req, res) => {
  renderFrontend(req, res);
})

app.get('/api', (req, res) => {
  viewLinks(req, res);
})
app.post('/api', (req, res) => {
  const password = req.body.password;
  const key = req.body.key;
  const value = req.body.value;

  if (!verifyPassword(password)) {
    res.status(401).send({
      message: 'invalid password',
    });
  }
  else if (!key) {
    res.status(400).send({
      message: 'invalid key',
    });
  } else {
    addLink(req, res, key, value);
  }
})

app.get('/:key', (req, res) => {
  const key = req.params.key;
  tryRedirect(req, res, key);
})
app.get('/', (req, res) => {
  tryRedirect(req, res, 'root');
})

module.exports = app
