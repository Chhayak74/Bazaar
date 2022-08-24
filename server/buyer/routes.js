const express = require( 'express');
const buyerRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('../auth/middleware.js');

buyerRouter.get('/list-of-sellers', middleware.authenticate, controller.listSellers);
buyerRouter.get('/seller-catalog/:seller_id', middleware.authenticate, controller.getCatalog);
buyerRouter.post('/create-order/:seller_id', middleware.authenticate, controller.createOrder);


module.exports =  buyerRouter;
