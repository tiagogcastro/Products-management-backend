import { getRepository } from 'typeorm';
import { Product } from '../../models/Product';

interface Request {
  ProductsLength?: number;
  id?: string;
}

interface FormatData {
  products: Product[];
  ProductsLength: number;
}

class ListAllProductsService {
  async execute({ProductsLength, id}:Request) : Promise<FormatData> {
    const productsRepository = getRepository(Product);
  
    const products = await productsRepository.find();

    ProductsLength = products.length;
    
    return {
      products,
      ProductsLength,
    }
  } 
}

export default ListAllProductsService;