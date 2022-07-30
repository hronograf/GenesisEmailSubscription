const router = require('express').Router();
const tickerPriceService = require('./tickerPriceService');

router.get('/rate',async function (req, res, next) {
    try {
        const tickerSymbol = process.env.TICKER_SYMBOL; // can be extracted from request
        const price = await tickerPriceService.getCurrentTickerPrice(tickerSymbol);
        res.status(200);
        res.json(price);

    } catch (e) {
        console.log(e);
        res.status(400);
        res.json();
    }
});

module.exports = router;
