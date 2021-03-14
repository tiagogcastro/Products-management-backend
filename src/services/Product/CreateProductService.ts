import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

interface Request {
  userId: string;
  name: string;
  quantity: number;
  price: number;
}

interface FormatData {
  user: User;
  product: Product;
}

class CreateProductService {
  async execute({userId, name, quantity, price}: Request): Promise<FormatData> {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if(!user) {
      throw new AppError('Você precisa está logado para criar um produto.');
    }

    if(price < 1 || quantity < 1) {
      throw new AppError('Por favor, coloque um preço/quantidade válido.');
    }

    const product = productRepository.create({
      user_id: user.id,
      name,
      quantity,
      price
    });

    await productRepository.save(product);

    return {
      user,
      product,
    }
  }
}

export default CreateProductService;