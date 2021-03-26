import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import User from '../../models/User';

interface Request {
  userId: string;
  productId: string;
}

class DeleteProductService {
  async execute({ userId, productId }: Request): Promise<void> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne(userId);
    const product = await productRepository.findOne(productId);

    if (!user) {
      throw new AppError('Este usuário não existe');
    }

    if (!product) {
      throw new AppError('Este Produto não existe');
    }

    await productRepository.delete(productId);
  }
}

export default DeleteProductService;
