import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListAllService from '../services/Product/ListAllProductsService';
import CreateProductService from '../services/Product/CreateProductService';
import { User } from '../models/User';
import { getRepository } from 'typeorm';
import UpdateProductService from '../services/Product/UpdateProductService';
import AppError from '../errors/AppError';
import { Product } from '../models/Product';

const productsRouter = Router();

productsRouter.post('/create', ensureAuthenticated, async (request, response) => {
  const userId = request.user.id;
  const {name, quantity, price} = request.body;
  const user = await getRepository(User).findOne(userId);

  const createProductService = new CreateProductService();

  const product = await createProductService.execute({
    userId,
    name, 
    quantity, 
    price
  });

  return response.json({
    product,
    user
  });
});

productsRouter.get('/', async (request, response) => {
  const listAllService = new ListAllService();
});

productsRouter.put('/:productId/edit', ensureAuthenticated, async (request, response) => {
  const { name, price, quantity } = request.body;
  const {productId} = request.params;
  const updateProductService = new UpdateProductService();

  const productUpdated = await updateProductService.execute({
    id: productId,
    name,
    price,
    quantity
  });

  return response.json(productUpdated);
});

productsRouter.delete('/:productId/delete', ensureAuthenticated, async (request, response) => {
  const {productId} = request.params;
  const userId = request.user.id

  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const user = await userRepository.findOne(userId);
  const product = await productRepository.findOne(productId);
  
  if(!user) {
    throw new AppError('Este usuário não existe');
  }

  if(!product) {
    throw new AppError('Este Produto não existe');
  }
  
  await productRepository.delete(productId);

  return response.json({
    success: "Usuário deletado com sucesso."
  });
});



export default productsRouter;