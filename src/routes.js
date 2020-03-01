import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import userMiddleware from './app/midllewares/UserMiddleware';
import admin from './app/midllewares/admin';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.get('/users', UserController.index);

routes.use(userMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.use(admin);

routes.post('/recipients', RecipientsController.store);
routes.put('/recipients', RecipientsController.update);

export default routes;
