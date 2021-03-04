import { Router} from 'express';
import usersRouter from './users.routers';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;