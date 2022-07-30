const router = require('express').Router();
const subscriptionService = require('./subscriptionService');
const {EmailAlreadySubscribedError, ValidationError} = require('./subscriptionError');

router.post('/subscribe', async function (req, res, next) {
    try {
        subscriptionService.subscribeEmail(req.body.email);
        res.status(200);
        res.json();
    } catch (err) {
        if (err instanceof EmailAlreadySubscribedError) {
            res.status(409);
            res.json();
        } else if (err instanceof ValidationError) {
            res.status(400);
            res.json({'message': err.message});
        } else {
            throw err;
        }
    }
});

router.post('/sendEmails',async function (req, res, next) {
    const tickerSymbol = process.env.TICKER_SYMBOL; // could be extracted from request
    const errorEmails = await subscriptionService.sendPriceInfoToAllSubscribers(tickerSymbol);
    res.status(200);
    if (errorEmails.length !== 0) {
        return res.json({errorEmails});
    }
    res.json();
});

module.exports = router;
