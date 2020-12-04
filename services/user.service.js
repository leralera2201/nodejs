const db = require('../database').getInstance();

module.exports = {
    findUsers: () => {
        const UserModel = db.getModel('User');
        return UserModel.findAll();
    },

    insertUser: (user) => {
        const UserModel = db.getModel('User');
        return UserModel.create(user);
    },

    findUserById: (id) => {
        const UserModel = db.getModel('User');
        const CarModel = db.getModel('Car');
        return CarModel.findAll({
            attributes: { exclude: ['user_id'] },
            where: { user_id: id },
            include: [{ model: UserModel, as: 'user' }]
        });
    },

    deleteUser: (userId) => {
        const UserModel = db.getModel('User');
        return UserModel.destroy({
            where: {
                id: userId
            }
        });
    },

    updateUser: (userId, user) => {
        const UserModel = db.getModel('User');
        return UserModel.update(
            { ...user },
            { returning: true, where: { id: userId } }
        );
    }
};
