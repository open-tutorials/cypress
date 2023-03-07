const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MailSlurp = require('mailslurp-client').default;
// OR import { MailSlurp } from "mailslurp-client"

// create a client
const apiKey = process.env.API_KEY ?? 'your-api-key';
const mailslurp = new MailSlurp({ apiKey });


(async function() {
    // create an inbox
    mailslurp.sendEmail('fae4d0d6-7f91-490f-8a60-a16255f2dd24', {
        to: ['c4d1a442-9e21-4c9b-9a4d-bbb45a91dbcb@mailslurp.com'],
        subject: "my subject line",
        body: "Hi there",
    });
})()

async function sendEmail(email, code) {
    await smtp.connect();
    await smtp.greet({ hostname: 'myservice.com' });
    await smtp.mail({ from: 'noreply@myservice.com' });
    await smtp.rcpt({ to: email });
    await smtp.data(`Your confirmation code is ${code}`);
    await smtp.quit();
}

const codes = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/confirm-email', async (req, res) => {
    const { email } = req.body;

    console.log('send confirmation email to', email);

    const code = Math.ceil(Math.random() * 9999) + 1000;
    codes[email] = code;
    await sendEmail(email, code);
    res.status(200).send('Please check your email');
});

app.post('/register', async (req, res) => {

});

app.listen(8081, () => {
    console.log('server has been started');
});
