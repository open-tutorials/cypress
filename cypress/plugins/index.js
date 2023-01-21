/// <reference types="cypress" />

const wget = require('node-wget');
const fs = require('fs');
const path = require('path');
const { parseQR } = require('qr-util');
const xlsx = require('node-xlsx');

// creating temp folder
const TMP_FOLDER = 'tmp';
if (!fs.existsSync(TMP_FOLDER)) {
  fs.mkdirSync(TMP_FOLDER);
}
module.exports = (on, config) => {
  on('task', {

    readQRCode: (url) => {
      console.log('checking QR code from URL', url);
      return new Promise((done) => {
        const tmpFile = path.join(TMP_FOLDER, 'qr_code.png');
        wget({ url, dest: tmpFile }, () => {
          console.log('file downloaded to', tmpFile);
          const buffer = fs.readFileSync(tmpFile);
          parseQR(buffer)
            .then(content => {
              console.log('code contents', content);
              done(content);
              fs.unlinkSync(tmpFile);
            });
        });
      });
    },

    downloadFile: ([url, tmpFileName]) => {
      return new Promise((done) => {
        console.log('download file', url, tmpFileName);
        const tmpFile = path.join(TMP_FOLDER, tmpFileName);
        wget({ url, dest: tmpFile }, () => {
          // TODO: Looks like a bug in wget. Waiting 1 sec. for closing file.
          setTimeout(() => {
            console.log('file downloaded to', tmpFile);
            done(tmpFile);
          }, 100);
        });
      });
    },

    waitFile: (file) => {
      return new Promise((done) => {
        console.log('looking file', file);
        let attempts = 5;
        const checkExists = () => {
          if (!fs.existsSync(file)) {
            if (--attempts > 0) {
              setTimeout(checkExists, 1000);
            } else {
              throw new Error('File not found');
            }
          } else {
            done(file);
          }
        };

        checkExists();
      });
    },

    xlsxToJson: (file) => {
      return new Promise((done) => {
        console.log('parse XLSX file to JSON', file);
        done(xlsx.parse(file));
      });
    }
  })

};
