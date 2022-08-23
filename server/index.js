const express = require('express');

const authRouter = require( './auth/routes.js');
const buyerRouter = require( './buyer/routes.js');
const sellerRouter = require( './seller/routes.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.text());

router.use('/auth', authRouter);
router.use('/buyer', buyerRouter);
router.use('/seller', sellerRouter);

module.exports = router;
