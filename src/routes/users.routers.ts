import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { User } from '../models/User';
import CreateUserService from '../services/CreateUserService';
import ChangePasswordService from '../services/Login/ChangePasswordService';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();

usersRouter.post('/create', async (request, response) => {
  const {email, name, password} = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    name,
    password,
  });

  const { secret, expiresIn } = auth.jwt;

  const token = sign({

  }, secret, {
    subject: user.id,
    expiresIn,
  });

  return response.json({
    user, 
    token
  });
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(request.user.id);

  if(!user) {
    throw new AppError('Você não está logado!');
  }

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
  const id = request.user.id
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(id);
  
  if(!user) {
    throw new AppError('Este usuário não existe');
  }
  
  await userRepository.delete(id);

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