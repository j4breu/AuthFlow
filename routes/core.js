const express = require('express');
const router = express.Router();

const { homePage } = require('../controllers/core');

router.route('/').get(homePage);

module.exports = router;
