import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { User } from '../../models/User';

interface Request{
  id: string;
  email: string;
  name: string;
}

class UpdateUserService {
  async execute({id, email, name}: Request): Promise<void | User> {
    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne(id);

    if(!findUser) {
      throw new AppError('You need to be logged in to update the user');
    }

    const user = await usersRepository.update(id, {
      email,
      name,
      updated_at: new Date()
    });

    if(user.affected === 1) {
      const userUpdated = await getRepository(User).findOne(id);
      return userUpdated
    }

    throw new AppError('Você não está logado.')

  }
}

export default UpdateUserService;