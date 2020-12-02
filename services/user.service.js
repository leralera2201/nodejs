const users = require('../db');

module.exports = {
    findUsers: () => users,

    insertUser: (user) => {
        const userToCreate = users.find((el) => el.email === user.email);

        if (userToCreate) {
            throw new Error('User already exist');
        }

        users.push(user);
        return 'User created';
    },

    findUserById: (field) => {
        const userToGet = users.find((user) => user.name.toLowerCase() === field.toLowerCase() || user.email === field);

        if (!userToGet) {
            throw new Error('User not found');
        }

        return userToGet;
    },

    deleteUser: (userId) => {
        const userToDeleteIndex = users.findIndex((user) => user.id.toString() === userId);

        if (userToDeleteIndex === -1) {
            throw new Error('User not found');
        }

        users.splice(userToDeleteIndex, 1);
        return 'User deleted';
    },

    updateUser: (userId, user) => {
        const userToUpdateIndex = users.findIndex((el) => el.id.toString() === userId);

        if (userToUpdateIndex === -1) {
            throw new Error('User not found');
        }

        users[userToUpdateIndex] = { ...users[userToUpdateIndex], ...user };
        return 'User updated';
    }
};
