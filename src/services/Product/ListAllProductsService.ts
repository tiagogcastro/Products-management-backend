import { getRepository } from 'typeorm';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

interface Request {
  id?: string;
}

class ListAllProductsService {
  async execute({id}:Request) : Promise<Product[]> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);
  
    const user = await usersRepository.findOne(id);
  
    const products = await productsRepository.find();

    return products
  } 
}

export default ListAllProductsService;