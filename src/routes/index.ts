import { Router} from 'express';
import usersRouter from './users.routers';
import sessionsRouter from './session.routers';
import productsRouter from './products.routers';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;