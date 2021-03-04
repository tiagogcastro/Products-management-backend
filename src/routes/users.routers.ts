import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/create', async (request, response) => {
  const {email, name, password} = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    name,
    password,
  });

  return response.json(user);
});

// usersRouter.get('/', (request, response) => {
// });

// usersRouter.put('/:user_id/edit', (request, response) => {
  
// });

// usersRouter.delete('/:user_id/delete', (request, response) => {
  
// });

export default usersRouter;