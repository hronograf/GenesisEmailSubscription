const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const subscriptionController = require('./subscription/subscriptionController');
const tickerPriceController = require('./ticker_price/tickerPriceController');
app.use('/', subscriptionController);
app.use('/', tickerPriceController);

module.exports = app;
