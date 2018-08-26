'use strict'

const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const s3Config = {
  Bucket: 'mpaulweeks-redirect',
  Key: 'links.json',
}

// s3 handlers

function getLinks() {
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

function putLinks(links) {
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

module.exports = {
  getLinks,
  putLinks,
};
