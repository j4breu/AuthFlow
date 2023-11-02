require('dotenv').config({ path: './.env' });

const User = require('../models/User');

const registration = (req, res) => {
    if (req.method === 'POST') {
        try {
            const { firstName, lastName, username, email, password } = req.body;

            if (!firstName || !lastName || !username || !email || !password) {
                throw new Error('Please fills all fields');
            };

            User.create({ ...req.body });

            return res.redirect('/auth/login');
        } catch (error) {
            return res.render('registration.ejs', { msg: error.message });
        };
    };

    if (req.session.cookie) {
        return res.redirect('/');
    };

    res.render('registration.ejs', { msg: 'OK' });
};

const login = (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error('Please fills all fields');
            };

            const rowid = User.search('email', email);

            if (!rowid) {
                return res.render('login.ejs', { msg: 'Invalid credentials' });
            };

            const result = User.findById(rowid);

            if (!User.comparePassword(password, result.password)) {
                return res.render('login.ejs', { msg: 'Invalid credentials' });
            };

            req.session.cookie = rowid;

            return res.redirect('/auth/login');
        } catch (error) {
            return res.render('login', { msg: error.message });
        };
    };

    if (req.session.cookie) {
        return res.redirect('/');
    };

    res.render('login.ejs', { msg: 'OK' });
};

const profile = (req, res) => {
    if (req.method === 'POST') {
        const { rowid } = req.session.cookie;
        const { firstName, lastName, username, email, password } = req.body;
        const new_user = { rowid, firstName, lastName, username, email, password };
        const user = User.findById({ rowid });

        try {
            User.update({ ...new_user });
        } catch (error) {
            return res.render('profile.ejs', { msg: error.message, user });
        };

        return res.render('profile.ejs', { msg: 'Profile updated', user: new_user });
    };

    if (!req.session.cookie) {
        return res.redirect('/auth/login');
    };

    const user = User.findById(req.session.cookie);
    res.render('profile.ejs', { msg: 'OK', user });
};

const logout = (req, res) => {
    if (req.session.cookie) {
        req.session = null;
        res.redirect('/');
    };
};

module.exports = {
    registration,
    login,
    profile,
    logout
};
