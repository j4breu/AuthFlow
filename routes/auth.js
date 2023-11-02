const express = require('express');
const router = express.Router();

const {
    registration,
    login,
    profile,
    logout
} = require('../controllers/auth');

router.route('/registration')
    .get(registration)
    .post(registration);

router.route('/login')
    .get(login)
    .post(login);

router.route('/profile')
    .get(profile)
    .post(profile);

router.route('/logout')
    .get(logout);

module.exports = router;
