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
              // fs.unlinkSync(tmpFile);
              done(content);
            });
        });
      });
    },

    xlsxToJson: (url) => {
      console.log('checking QR code from URL', url);
      return new Promise((done) => {
        const tmpFile = path.join(TMP_FOLDER, 'file.xlsx');
        wget({ url, dest: tmpFile }, () => {
          console.log('file downloaded to', tmpFile);
          done(xlsx.parse(tmpFile));
        });
      });
    }
  })
};