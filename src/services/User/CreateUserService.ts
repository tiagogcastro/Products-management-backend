import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';

import User from '../../models/User';
import UsersRepository from '../../repositories/UsersRepository';

interface Request {
  email: string;
  name: string;
  password: string;
}

class CreateUserService {
  async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExist = await usersRepository.findOne({
      where: { email },
    });

    if (userExist) {
      throw new AppError('User already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
