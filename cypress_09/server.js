const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MailSlurp = require('mailslurp-client').default;

require('dotenv').config();

const MAIL_SLURP_API_KEY = process.env.MAIL_SLURP_API_KEY;
console.log('Mail Slurp api key is', MAIL_SLURP_API_KEY);

const OUTBOX = process.env.OUTBOX;
console.log('Outbox is', OUTBOX);

const SECRET = process.env.SECRET;
console.log('Secret is', SECRET);

// create a client
const MAIL_SLURP = new MailSlurp({ apiKey: MAIL_SLURP_API_KEY });

function sendEmail(email, code) {
    return MAIL_SLURP.sendEmail(OUTBOX, {
        to: [email],
        subject: 'Please confirm your email',
        body: `Your confirmation code is ${code}`,
    });
}

const codes = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.status(200).send('Hello, I am running!');
});

app.post('/confirm-email', (req, res) => {
    const { email } = req.body;
    console.log('send confirmation email to', email);
    const code = Math.ceil(Math.random() * 8999) + 1000;
    codes[email] = code.toString();
    sendEmail(email, code)
        .then(() => res.status(200).send('Please check your email'))
        .catch(err => {
            console.log(err);
            res.status(500).send('Can\'t send email')
        })
});

app.post('/register', async (req, res) => {
    const { email, code, name } = req.body;
    console.log('check code for', email, codes[email], '=', code);
    if (codes[email] !== code && req.header('x-secret') !== process.env.SECRET) {
        res.status(400).send('Wrong confirmation code');
        return;
    }

    res.status(200).send(`You has been registered ${name}!`);
});

app.listen(8081, () => {
    console.log('server has been started on http://localhost:8081');
});
