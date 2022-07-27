const router = require('express').Router();
const axios = require('axios');
const nodemailer = require('nodemailer');

router.get('/rate',async function (req, res, next) {
    res.contentType('application/json');
    try {
        // let binanceResponse = await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUAH');
        let binanceResponse = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH');
        res.status(200);
        res.json({'price': parseFloat(binanceResponse.data.price)});
    } catch (e) {
        res.status(400);
        res.json({'message': 'Something went wrong'});
    }
});


module.exports = router;
