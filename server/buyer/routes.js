const express = require( 'express');
const bodyParser = require( 'body-parser');
const buyerRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('../auth/middleware.js');

buyerRouter.use(bodyParser.json());
buyerRouter.use(bodyParser.urlencoded({ extended: true }));
buyerRouter.use(bodyParser.text());

buyerRouter.get('/list-of-sellers', middleware.authenticate, controller.listSellers);
buyerRouter.get('/seller-catalog/:seller_id', controller.getCatalog);
buyerRouter.post('/create-order/:seller_id', controller.createOrder);


module.exports =  buyerRouter;
