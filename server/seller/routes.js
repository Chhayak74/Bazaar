const express = require( 'express');
const bodyParser = require( 'body-parser');
const sellerRouter = express.Router();
const controller = require( './controller.js');

sellerRouter.use(bodyParser.json());
sellerRouter.use(bodyParser.urlencoded({ extended: true }));
sellerRouter.use(bodyParser.text());

sellerRouter.post('/createCatalog', controller.createCatalog);
sellerRouter.get('/orders', controller.orders);

module.exports =  sellerRouter;
