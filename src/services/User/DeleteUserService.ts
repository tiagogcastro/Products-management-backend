import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';

interface Request {
  id: string;
}

class DeleteUserService {
  async execute({ id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Este usuário não existe');
    }

    await userRepository.delete(id);
  }
}

export default DeleteUserService;
