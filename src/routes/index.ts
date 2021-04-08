import { Router} from 'express';
import usersRouter from './users.routers';
import productsRouter from './products.routers';
import sessionsRouter from './session.routers';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/products', productsRouter);
routes.use('/', sessionsRouter);

export default routes;