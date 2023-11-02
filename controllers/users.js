const User = require('../models/User');

const createUser = (req, res) => {
    try {
        const user = User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    };
};

const getUser = (req, res) => {
    try {
        const user = User.findById({ rowid: Number(req.params.id) });

        if (!user) {
            return res.status(404).json({ msg: `Not task with id : ${rowid}` });
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    };
};

const listUsers = (req, res) => {
    const user = User.listAll();
    res.status(200).json(user);
};

const updateUser = (req, res) => {
    try {
        const { id: rowid } = req.params;

        const user = User.update({ rowid: Number(rowid) }, req.body);

        if (!user) {
            return res.status(404).json({ msg: `Not task with id : ${rowid}` });
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    };
};

const removeUser = (req, res) => {
    try {
        const user = User.remove({ rowid: Number(req.params.id) });

        if (!user) {
            return res.status(404).json({ msg: `Not task with id : ${rowid}` });
        };

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    };
};

module.exports = {
    createUser,
    getUser,
    listUsers,
    updateUser,
    removeUser
};
