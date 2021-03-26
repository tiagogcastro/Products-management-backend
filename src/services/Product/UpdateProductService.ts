import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import User from '../../models/User';

interface Request {
  id: string;
  name: string;
  price: number;
  quantity: number;
  idUser?: string;
}

class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
    idUser,
  }: Request): Promise<Product | void> {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(User);

    const findProduct = await productRepository.findOne(id);
    const userLogged = await userRepository.findOne(idUser);

    if (!userLogged) {
      throw new AppError('You need to be logged in to update the user');
    }

    if (!findProduct?.id) {
      throw new AppError('Este produto não existe.');
    }

    if (price <= 0 || quantity < 1) {
      throw new AppError('Por favor, coloque um preço/quantidade válido.');
    }

    const updateProduct = await productRepository.update(id, {
      name,
      price,
      quantity,
      updated_at: new Date(),
    });

    if (updateProduct.affected === 1) {
      const productUpdated = await productRepository.findOne(id);
      return productUpdated;
    }

    throw new AppError('Você não está logado.');
  }
}

export default UpdateProductService;
