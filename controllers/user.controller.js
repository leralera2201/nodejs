const userService = require('../services/user.service');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            const user = await userService.insertUser({ email, password, name });

            res.status(201).json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const userCars = await userService.findUserById(userId);

            if (userCars.length === 0) {
                throw new Error('User not found');
            }

            res.json(userCars);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userService.deleteUser(userId);
            if (!user) {
                throw new Error('Something went wrong');
            }

            res.json('User deleted');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = req.body;
            // eslint-disable-next-line no-unused-vars
            const [
                _,
                updatedUser
            ] = await userService.updateUser(userId, user);

            if (!updatedUser) {
                throw new Error('Something went wrong');
            }

            res.json('User was updated');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
