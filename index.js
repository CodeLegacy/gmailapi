var express = require('express')
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
app = express()

const oauth2Client = new OAuth2(
     "ClientId", // ClientID
     "Client Secret", // Client Secret
     "Redirect Url" // Redirect URL
);

const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "user mail id", 
          clientId: "Client Id",
          clientSecret: "Client Secret",
          refreshToken: "Your Refresh token",
          accessToken: oauth2Client.getAccessToken()
     },
     tls:{
         rejectUnauthorized:false
     }
});

const mailOptions = {
     from: "Enter sender's mail id",
     to: "Enter receiver's mail id",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});

oauth2Client.setCredentials({
     refresh_token: "Your Refresh Token Here"
});
const accessToken = oauth2Client.getAccessToken()
