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

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(request.user.id);

  return response.json({ user });
});

usersRouter.put('/edit', ensureAuthenticated, async (request, response) => { 
  const id = request.user.id;

  const { email, name } = request.body;

  const user = new UpdateUserService();

  const update = await user.execute({
    id,
    email,
    name
  });
  
  return response.json(update);

});

usersRouter.delete('/delete', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  await userRepository.delete(request.user.id);

  return response.send();
});

// Sem está logado
// usersRouter.post('/reset-password', async (request, response) => {

// });

// Logado
usersRouter.put('/password', ensureAuthenticated, async (request, response) => {
  const id = request.user.id;

  const { password, newPassword, repeatPassword } = request.body;

  const user = new ChangePasswordService();

  const update = await user.execute({
    id,
    password,
    newPassword,
    repeatPassword
  });
  
  return response.json(update);

});

export default usersRouter;