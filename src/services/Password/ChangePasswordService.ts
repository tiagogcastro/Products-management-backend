import { compare, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { User } from '../../models/User';

interface Request {
  id: string;
  password: string;
  newPassword: string;
  repeatPassword: string;
}

class ChangePasswordService {
  async execute({id, password, newPassword, repeatPassword}: Request): Promise<void | User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne(id);
      
    if(!findUser) {
      throw new AppError('You need to be logged in to update the user') 
    }

    const passwordUnHashed = await compare(password, findUser.password);

    if(!passwordUnHashed) {
      throw new AppError('A senha antiga está errada.');
    }

    if(newPassword !== repeatPassword) {
      throw new AppError('As senhas não são iguais.');
    }
  
    if(password === newPassword) {
      throw new AppError('A nova senha não pode ser igual a antiga.');
    }

    if(newPassword.length < 6) {
      throw new AppError('A nova senha deve ter no mínimo 6 digitos.');
    }
      
    const newPasswordHashed = await hash(newPassword, 8);

    const userUpdatedPassword = await getRepository(User).update(id, {
      password: newPasswordHashed,
      updated_at: new Date()
    });

    if(userUpdatedPassword.affected === 1) {
      const passwordUpdated = await getRepository(User).findOne(id);
      return passwordUpdated;
    }
    
    throw new AppError('User not found for update password')

  }
}

export default ChangePasswordService;