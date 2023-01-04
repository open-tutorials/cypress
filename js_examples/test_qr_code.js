const wget = require('node-wget');
const fs = require('fs');
const path = require('path');
const { parseQR } = require('qr-util');

const TMP_FOLDER = 'tmp';
const tmpFile = path.join(TMP_FOLDER, 'qr_code_1.png');

function scanQR(url) {
    return new Promise((done) => {
        wget({ url, dest: tmpFile }, () => {
            console.log('file downloaded to', tmpFile);
            const buffer = fs.readFileSync(tmpFile);
            parseQR(buffer)
                .then(content => {
                    // fs.unlinkSync(tmpFile);
                    done(content);
                });
        });
    });
}

scanQR('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=anton')
    .then(content => {
        console.log('code contents', content);
    });