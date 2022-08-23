const express = require( 'express');
const bodyParser = require( 'body-parser');

const authRouter = express.Router();
const controller = require( './controller.js');
const middleware = require('./middleware.js');

authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({ extended: true }));
authRouter.use(bodyParser.text());

authRouter.post('/login', controller.login);
authRouter.post('/register', controller.register);

authRouter.use(middleware.authenticate);
module.exports =  authRouter;
