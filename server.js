const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const _ = require('lodash')
const appConfig = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//adding static folder
app.use(`/static`, express.static(`static`));

// adding routes
app.get('/', function(req, res) {
    res.sendFile(path.join(`${__dirname}/pages/index.html`));
});
app.post('/send-email', function(req, res) {
    const {
        subject,
        _replyto,
        name,
        message
    } = req.body;
    try {
        const emailConfig = appConfig.emailConfig || {}
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: emailConfig.username || "",
                pass: emailConfig.password || ""
            }
        });
        const mailOptions = {
            to: _.join(appConfig.users || [], ","),
            subject: `${name} : ${subject} `,
            html: `<b>Name : </b>${name} <br><b>E-mail : </b>${_replyto}<br><b>Message : </b>${message}`
        }
        console.log(JSON.stringify({ mailOptions }))
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(JSON.stringify({ error }));
            } else {
                console.log(JSON.stringify({ info }));
            }
            res.redirect('/');
        })
    } catch (error) {
        console.log({ error })
        res.redirect('/');
    }
});

app.listen(3001);