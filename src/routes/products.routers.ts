import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ListAllProductsService from '../services/Product/ListAllProductsService';
import CreateProductService from '../services/Product/CreateProductService';
import UpdateProductService from '../services/Product/UpdateProductService';
import DeleteProductService from '../services/Product/DeleteProductService';
import ListOneProductService from '../services/Product/ListOneProductService';

const productsRouter = Router();

productsRouter.post(
  '/create',
  ensureAuthenticated,
  async (request, response) => {
    const userId = request.user.id;
    const { name, quantity, price } = request.body;

    const createProductService = new CreateProductService();

    const data = await createProductService.execute({
      userId,
      name,
      quantity,
      price,
    });

    return response.json({ data });
  },
);

productsRouter.get('/', async (request, response) => {
  const listAllProductsService = new ListAllProductsService();

  const data = await listAllProductsService.execute({});

  return response.json({ data });
});

productsRouter.get('/:productId', async (request, response) => {
  const { productId } = request.params;

  const listOneProductService = new ListOneProductService();

  const data = await listOneProductService.execute({
    productId,
  });

  return response.json({ data });
});

productsRouter.put(
  '/:productId/edit',
  ensureAuthenticated,
  async (request, response) => {
    const { name, price, quantity } = request.body;
    const { productId } = request.params;
    const updateProductService = new UpdateProductService();

    const productUpdated = await updateProductService.execute({
      id: productId,
      name,
      price,
      quantity,
    });

    return response.json(productUpdated);
  },
);

productsRouter.delete(
  '/:productId/delete',
  ensureAuthenticated,
  async (request, response) => {
    const userId = request.user.id;
    const { productId } = request.params;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({
      userId,
      productId,
    });

    return response.json({
      success: 'Produto deletado com sucesso.',
    });
  },
);

export default productsRouter;
