const { fetchNone } = require('./connection');
const User = require('../models/User');
const jsonUsers = require('./data.json');

const fill = () => {
    jsonUsers.forEach((user) => {
        User.create({ ...user });
    });

};

const reset = () => {
    let query = 'DROP TABLE IF EXISTS users';
    fetchNone(query);

    const fields = '(firstName TEXT NOT NULL, lastName TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)';

    query = `CREATE TABLE IF NOT EXISTS users ${fields}`;
    fetchNone(query);
};

module.exports = {
    reset,
    fill
};
