const nodemailer = require('nodemailer');
const subscriptionRepository = require('./subscriptionRepository');
const tickerPriceService = require('../ticker_price/tickerPriceService');
const {EmailAlreadySubscribedError, ValidationError} = require('./subscriptionError');

const transporter = nodemailer.createTransport({
    pool: true,
    secure: true,
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.OAUTH_USER_MAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

async function sendPriceInfoToAllSubscribers(tickerSymbol) {
    const price = await tickerPriceService.getCurrentTickerPrice(tickerSymbol);
    const errorEmails = [];
    const subscriberEmails = await subscriptionRepository.getAllSubscriberEmails();
    for (const email of subscriberEmails) {
        try {
            const userName = email.split('@')[0];
            const mailOptions = {
                from: process.env.OAUTH_USER_MAIL,
                to: email,
                subject: `Current ${tickerSymbol} price`,
                text: `
                Hello ${userName}!
                Current ${tickerSymbol} price is ${price}.
                Be careful!
                
                You received this letter because you signed up for the mailing list.
                `,
            };
            const result = await transporter.sendMail(mailOptions);
            errorEmails.push(...result.rejected);

        } catch {
            errorEmails.push(email);
        }
    }

    return errorEmails;
}

async function subscribeEmail(email) {
    if (!isEmailValid(email)) {
        throw new ValidationError('Email is not valid');
    }

    const subscriberEmails = await subscriptionRepository.getAllSubscriberEmails();
    if (subscriberEmails.includes(email)) {
        throw new EmailAlreadySubscribedError(`Current email (${email}) has already been subscribed`);
    }

    await subscriptionRepository.saveSubscriberEmail(email);
}

function isEmailValid(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

module.exports = {
    sendPriceInfoToAllSubscribers,
    subscribeEmail,
}
