const userService = require('../services/user.service');

module.exports = {
    createUser: (req, res) => {
        try {
            const msg = userService.insertUser(req.body);

            res.status(201).json(msg);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const { field } = req.params;
            const user = userService.findUserById(field);

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUsers: (req, res) => {
        try {
            const users = userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const { userId } = req.params;
            const msg = userService.deleteUser(userId);

            res.json(msg);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: (req, res) => {
        try {
            const { userId } = req.params;
            const user = req.body;
            const msg = userService.updateUser(userId, user);

            res.json(msg);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
