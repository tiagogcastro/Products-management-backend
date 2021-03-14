import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import auth from '../config/auth';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/User/CreateUserService';
import ChangePasswordService from '../services/Password/ChangePasswordService';
import UpdateUserService from '../services/User/UpdateUserService';
import DeleteUserService from '../services/User/DeleteUserService';
import UserLoggedService from '../services/User/UserLoggedService';

const usersRouter = Router();

usersRouter.post('/register', async (request, response) => {
  const {email, name, password} = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    name,
    password,
  });

  const { secret } = auth.jwt;

  const token = sign({
  }, secret, {
    subject: user.id,
    expiresIn: 86400000,
  });

  return response.json({
    user, 
    token
  });
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const id = request.user.id;

  const userLoggedService = new UserLoggedService();

  const data = await userLoggedService.execute({
    id
  });

  return response.json({ data });
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
  const id = request.user.id

  const userDeleteService = new DeleteUserService();

  await userDeleteService.execute({
    id
  });

  return response.json({
    success: "Usuário deletado com sucesso."
  });
});

// Sem está logado
// usersRouter.post('/reset-password', async (request, response) => {

// });

// Logado
usersRouter.put('/alter-password', ensureAuthenticated, async (request, response) => {
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