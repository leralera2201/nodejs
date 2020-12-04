const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userMiddleware.checkId, userController.getUserById);
userRouter.delete('/:userId', userMiddleware.checkId, userController.deleteUser);
userRouter.post('/', userMiddleware.checkValidity, userController.createUser);
userRouter.put('/:userId', userMiddleware.checkId, userMiddleware.checkUpdate, userController.updateUser);

module.exports = userRouter;
