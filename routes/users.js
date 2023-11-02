const express = require('express');
const router = express.Router();

const {
    createUser,
    getUser,
    listUsers,
    updateUser,
    removeUser
} = require('../controllers/users');

router.route('/')
    .get(listUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(removeUser);

module.exports = router;
