const axios = require('axios');

async function getCurrentTickerPrice(tickerSymbol) {
    let binanceResponse = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${tickerSymbol}`);
    return parseFloat(binanceResponse.data.price)
}

module.exports = {
    getCurrentTickerPrice,
}
