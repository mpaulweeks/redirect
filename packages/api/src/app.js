'use strict'

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('api hello world')
})

module.exports = app
