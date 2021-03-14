import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

interface Request {
  userId?: string;
  productId: string;
}

interface FormatData {
  productOwner: User;
  product: Product;
}

class ListOneProductService {
  async execute({userId, productId}: Request): Promise<FormatData> {
    const userRepository = getRepository(User);
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(productId);

    if(!product?.id) {
      throw new AppError('Este produto não existe.');
    }

    const productOwner = await userRepository.findOne({
      where: {
        id: product.user_id
      }
    });

    if(!productOwner) {
      throw new AppError('Este produto não tem um proprietário.')
    }
    
    return {
      productOwner,
      product
    }

  }
}

export default ListOneProductService;