const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:field', userController.getUserById);
userRouter.delete('/:userId', userController.deleteUser);
userRouter.post('/', userMiddleware.addId, userMiddleware.checkValidity, userController.createUser);
userRouter.put('/:userId', userController.updateUser);

module.exports = userRouter;
