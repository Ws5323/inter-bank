import { Router } from 'express';
import userAuthenticated from '../middlewares/userAuthenticated';
import PixController from '../resources/pix/pix.controller'

const pixRouter = Router();

pixRouter.use(userAuthenticated);

const pixController = new PixController();

pixRouter.post('/request', pixController.request)
pixRouter.post('/pay/:key', pixController.pay)
pixRouter.get('/transactions', pixController.transactions)

export default pixRouter;

