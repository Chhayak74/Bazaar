const express = require( 'express');

const authRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('./middleware.js');

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);

authRouter.use(middleware.authenticate);
module.exports =  authRouter;
