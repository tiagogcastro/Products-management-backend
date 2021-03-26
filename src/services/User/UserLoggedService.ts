import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import User from '../../models/User';

interface Request {
  id: string;
  ProductsLength?: number;
}

interface FormatData {
  user: User;
  products: Product[];
  ProductsLength: number;
}

class GetUserLoggedService {
  async execute({ id, ProductsLength }: Request): Promise<FormatData> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Você não está logado!');
    }

    const products = await productRepository.find({
      where: {
        user_id: user.id,
      },
    });

    ProductsLength = products.length;

    return {
      user,
      products,
      ProductsLength,
    };
  }
}

export default GetUserLoggedService;
