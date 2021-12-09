import { Router } from 'express';
import userAuthenticated from '../middlewares/userAuthenticated';

const pixRouter = Router();

pixRouter.use(userAuthenticated);

//const pixController = new UserController();

// pixRouter.post('/signin', userController.signin)
// pixRouter.post('/signup', userController.signup)
// pixRouter.get('/signup', userController.signup)

export default pixRouter;

