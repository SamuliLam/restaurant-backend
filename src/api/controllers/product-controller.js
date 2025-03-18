import {
  getAllProducts as getAllProductsModel,
  getProductById as getProductByIdModel,
  createProduct as createProductModel,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel
} from "../models/product-model.js";

/**
 * @api {get} /products Request all products
 * @apiName GetProducts
 * @apiGroup Product
 * @apiSuccess (200) {Object[]} products List of products.
 * @apiSuccess (200) {Number} products.id Product's unique ID.
 * @apiSuccess (200) {String} products.name Product's name.
 * @apiSuccess (200) {String} products.description Product's description.
 * @apiSuccess (200) {String} products.price Product's price.
 * @apiSuccess (200) {String} products.category Product's category.
 * @apiSuccess (200) {Object[]} products.allergens List of allergens.
 * @apiSuccess (200) {String} products.allergens.id Allergen's unique ID.
 * @apiSuccess (200) {String} products.allergens.name Allergen's name.
 * @apiError (404) Products Not found.
 * apiError (500) Internal server error
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "name": "Margherita",
 *        "description": "Classic pizza with tomato, mozzarella, basil",
 *        "price": "9.99",
 *        "category": "Pizza",
 *        "allergens": [
 *          {
 *            "id": "3",
 *            "name": "Milk"
 *          },
 *          {
 *            "id": "7",
 *            "name": "Wheat (Gluten)"
 *          }
 *        ]
 *      }
 *    ]
 */
const getAllProducts = async (req, res) => {
  res.json(await getAllProductsModel());
}

/**
 * @api {get} /products/:id Request Product information
 * @apiName GetProduct
 * @apiGroup Product
 * @apiParam {Number} id Product's unique ID.
 * @apiSuccess (200) {Number} id Product's unique ID.
 * @apiSuccess (200) {String} name Product's name.
 * @apiSuccess (200) {String} description Product's description.
 * @apiSuccess (200) {String} price Product's price.
 * @apiSuccess (200) {String} category Product's category.
 * @apiError (404) {String} message Product not found.
 * @apiError (500) {String} message Internal server error.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "Margherita",
 *      "description": "Classic pizza with tomato, mozzarella, basil",
 *      "price": "9.99",
 *      "category": "Pizza"
 *    }
 */
const getProductById = async (req, res) => {
  const id = req.params.id;
  res.json(await getProductByIdModel(id));
}

/**
 * @api {post} /products Add a new product
 * @apiName PostProduct
 * @apiGroup Product
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {String} name Product's name.
 * @apiParam {String} description Product's description.
 * @apiParam {String} price Product's price.
 * @apiParam {String} category Product's category.
 * @apiSuccess (201) {String} message New product added.
 * @apiSuccess (201) {Object} result Product information.
 * @apiError (401) {String} error Unauthorized.
 * @apiError (500) {String} message Internal server error.
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 OK
 *  {
 *  "message": "New product added.",
 *  "result": {
 *  "product_id": 1337
 *  }
 */

/**
 * @api {post} /products Add a new product
 * @apiName PostProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {String} name Product's name.
 * @apiParam {String} description Product's description.
 * @apiParam {String} price Product's price.
 * @apiParam {String} category Product's category.
 * @apiParam {String} allergens Product's allergens.
 * @apiSuccess (201) {String} message New product added.
 * @apiSuccess (201) {Object} result Product information.
 * @apiSuccess (201) {Number} result.product_id The ID of the new product.
 * @apiError (401) {String} error Unauthorized.
 * @apiError (500) {String} message Internal server error.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 OK
 * {
 * "message": "New product added.",
 * "result": {
 * "product_id": 1337
 * }
 * }
 */
const postProduct = async (req, res) => {
  const result = await createProductModel(req.body, res.locals.user);
  if (result.product_id){
    res.status(201);
    res.json({message: 'New product added.', result});
  } else {
    res.status(401);
    res.json({error: "Unauthorized"});
  }
}

/**
 * @api {put} /products/:id Update Product
 * @apiName PutProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Product's unique ID.
 * @apiParam {String} [name] Product's name.
 * @apiParam {String} [description] Product's description.
 * @apiParam {String} [price] Product's price.
 * @apiParam {String} [category] Product's category.
 * @apiParam {String} [allergens] Product's allergens.
 * @apiSuccess (200) {Object} result Product information.
 * @apiError (401) {String} error Unauthorized.
 * @apiError (400) {String} error Bad Request.
 * @apiError (500) {String} message Internal server error.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "Product updated",
 * "product": {
 * "name": "Margherita",
 * "description": "Classic pizza with tomato, mozzarella, basil",
 * "price": "13.77",
 * "category": "Pizza"
 * }
 * }
 */
const putProduct = async (req, res) => {
  const result = await updateProductModel(req.body, req.params.id, res.locals.user);
  if (!result){
    res.status(401);
    res.json({error: "Unauthorized"});
  }
  res.json(result);
}

/**
 * @api {delete} /products/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Product's unique ID.
 * @apiSuccess (200) {Object} result Success message and the ID of the deleted product.
 * @apiError (401) {String} error Unauthorized.
 * @apiError (400) {String} error Bad Request.
 * @apiError (500) {String} message Internal server error.
 */
const deleteProduct = async (req, res) => {
  const result = await deleteProductModel(req.params.id, res.locals.user);
  if (!result){
    res.status(400);
    res.json({error: "Bad Request"});
  }
  res.json(result);
}

export {getAllProducts, getProductById, postProduct, putProduct, deleteProduct};
