const express = require( 'express');
const bodyParser = require( 'body-parser');
const sellerRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('../auth/middleware.js');

sellerRouter.use(bodyParser.json());
sellerRouter.use(bodyParser.urlencoded({ extended: true }));
sellerRouter.use(bodyParser.text());

sellerRouter.post('/createCatalog',middleware.authenticate, controller.createCatalog);
sellerRouter.get('/orders',middleware.authenticate, controller.orders);

module.exports =  sellerRouter;
