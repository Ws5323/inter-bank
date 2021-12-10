import { request, response, Router } from 'express';
import  { UserController }  from '../resources/user/user.controller'
import userAuthenticated from '../middlewares/userAuthenticated';


const userRouter = Router();

const userController = new UserController();

userRouter.post('/signin', userController.signin)
userRouter.post('/signup', userController.signup)
userRouter.get('/me', userAuthenticated, userController.me)


export default userRouter;



