const router = require('express').Router();
const subscriptionService = require('./subscriptionService');

router.post('/sendEmails',async function (req, res, next) {
    const tickerSymbol = process.env.TICKER_SYMBOL; // can be extracted from request
    const errorMails = await subscriptionService.sendPriceInfoToAllSubscribers(tickerSymbol);
    res.status(200);
    if (errorMails.length !== 0) {
        return res.json({errorMails});
    }
    res.json();
});

module.exports = router;
