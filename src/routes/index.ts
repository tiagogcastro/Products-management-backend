import { Router} from 'express';
import usersRouter from './users.routers';
import sessionsRouter from './session.routers';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;