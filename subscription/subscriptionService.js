const nodemailer = require('nodemailer');
const subscriptionRepository = require('./subscriptionRepository');
const tickerPriceService = require('../ticker_price/tickerPriceService')

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
    const errorMails = [];
    const subscriberMails = await subscriptionRepository.getAllSubscriberMails();
    for (const email of subscriberMails) {
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
            errorMails.push(...result.rejected);

        } catch {
            errorMails.push(email);
        }
    }

    return errorMails;
}

module.exports = {
    sendPriceInfoToAllSubscribers,
}
