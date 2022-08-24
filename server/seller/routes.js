const express = require( 'express');
const sellerRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('../auth/middleware.js');

sellerRouter.post('/create-catalog',middleware.authenticate, controller.createCatalog);
sellerRouter.get('/orders',middleware.authenticate, controller.orders);

module.exports =  sellerRouter;
