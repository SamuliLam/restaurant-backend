import {
  listAllOrders,
  findOrderById,
  findOrdersByCustomerId,
  findOrderedItemsByOrderId,
  addOrder,
  updateOrder,
  removeOrder,
} from "../models/order-model.js";

/**
 * @api {get} /orders Request all orders
 * @apiName GetOrders
 * @apiGroup Order
 * @apiSuccess (200) {Object[]} orders List of orders.
 * @apiSuccess (200) {Number} orders.order_id Order's unique ID.
 * @apiSuccess (200) {Number} orders.customer_id Customer's unique ID.
 * @apiSuccess (200) {String} orders.order_date Order date.
 * @apiSuccess (200) {String} orders.delivery_address Delivery address.
 * @apiSuccess (200) {String} orders.status Order status.
 * @apiSuccess (200) {String} orders.total_price Total price.
 * @apiSuccess (200) {String} orders.first_name Customer's first name.
 * @apiSuccess (200) {String} orders.last_name Customer's last name.
 * @apiSuccess (200) {String} orders.phone Customer's phone number.
 * @apiSuccess (200) {String} orders.email Customer's email.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "order_id": 122,
 *        "customer_id": 1337,
 *        "order_date": "2024-05-05T15:09:01.000Z",
 *        "delivery_address": "1234 Main Street",
 *        "status": "being delivered",
 *        "total_price": "20.98",
 *        "first_name": "John",
 *        "last_name": "Doe",
 *        "phone": "045 123 4567",
 *        "email": "john.doe@mail.com"
 *      }
 *    ],
 *    more orders...
 *    @apiError (404) {String} message No orders found.
 *    @apiError (500) {String} message Internal server error
 *
 */
const getOrders = async (req, res) => {
  const orders = await listAllOrders();
  if (!orders) {
    return res.status(404).json({message: "No orders found"});
  }
  return res.status(200).json(orders);
};

/**
 * @api {get} /orders/:id Request Order information
 * @apiName GetOrder
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiSuccess (200) {Object} order Order information.
 * @apiSuccess (200) {Number} order.order_id Order's unique ID.
 * @apiSuccess (200) {Number} order.customer_id Customer's unique ID.
 * @apiSuccess (200) {String} order.order_date Order date.
 * @apiSuccess (200) {String} order.delivery_address Delivery address.
 * @apiSuccess (200) {String} order.status Order status.
 * @apiSuccess (200) {String} order.total_price Total price.
 * @apiSuccess (200) {String} order.first_name Customer's first name.
 * @apiSuccess (200) {String} order.last_name Customer's last name.
 * @apiSuccess (200) {String} order.phone Customer's phone number.
 * @apiSuccess (200) {String} order.email Customer's email.
 * @apiError (404) {String} message Order not found.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "order_id": 122,
 *   "customer_id": 1337,
 *   "order_date": "2024-05-05T15:09:01.000Z",
 *   "delivery_address": "1234 Main Street",
 *   "status": "being delivered",
 *   "total_price": "20.98",
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "phone": "045 123 4567",
 *   "email": john.doe@mail.com"
 *   }
 *   @apiError (404) {String} message Order not found.
 *   @apiError (500) {String} message Internal server error
 */
const getOrderById = async (req, res) => {
  const order = await findOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({message: "Order not found"});
  }
  return res.status(200).json(order);
};

/**
 * @api {get} /orders/customer/:customerId Request Orders by Customer ID
 * @apiName GetOrdersByCustomerId
 * @apiGroup Order
 * @apiParam {Number} customerId Customer's unique ID.
 * @apiSuccess (200) {Object[]} orders List of orders.
 * @apiSuccess (200) {Number} orders.order_id Order's unique ID.
 * @apiSuccess (200) {Number} orders.customer_id Customer's unique ID.
 * @apiSuccess (200) {String} orders.order_date Order date.
 * @apiSuccess (200) {String} orders.delivery_address Delivery address.
 * @apiSuccess (200) {String} orders.status Order status.
 * @apiSuccess (200) {String} orders.total_price Total price.
 * @apiSuccess (200) {Object[]} orders.products List of products in the order.
 * @apiSuccess (200) {Number} orders.products.order_item_id Order item's unique ID.
 * @apiSuccess (200) {Number} orders.products.order_id Order's unique ID.
 * @apiSuccess (200) {Number} orders.products.product_id Product's unique ID.
 * @apiError (404) {String} message No orders found.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order": {
 *         "order_id": 122,
 *         "customer_id": 1337,
 *         "order_date": "2024-05-05T15:09:01.000Z",
 *         "delivery_address": "1234 Main Street
 *         "status": "being delivered",
 *         "total_price": "20.98"
 *       },
 *       "products": [
 *         {
 *           "order_item_id": 252,
 *           "order_id": 122,
 *           "product_id": 1
 *         },
 *         {
 *           "order_item_id": 253,
 *           "order_id": 122,
 *           "product_id": 2
 *         }
 *       ]
 *     }
 *   ]
 *   @apiError (404) {String} message No orders found.
 *   @apiError (500) {String} message Internal server error
 */
const getOrdersByCustomerId = async (req, res) => {
  const orders = await findOrdersByCustomerId(req.params.customerId);
  if (!orders) {
    return res.status(404).json({message: "No orders found"});
  }
  return res.status(200).json(orders);
};

/**
 * @api {post} /orders/ Create a new Order
 * @apiName PostOrder
 * @apiGroup Order
 * @apiParam {Object} order Order information.
 * @apiParam {Number} order.customer_id Customer's unique ID.
 * @apiParam {String} order.delivery_address Delivery address.
 * @apiParam {String} order.status Order status.
 * @apiParam {Number} order.total_price Total price.
 * @apiParam {Object[]} products List of products in the order.
 * @apiParam {Number} products.product_id Product's unique ID.
 * @apiSuccess (201) {String} message Order creation status message.
 * @apiSuccess (201) {Object} order Order information.
 * @apiSuccess (201) {Number} order.customer_id Customer's unique ID.
 * @apiSuccess (201) {String} order.delivery_address Delivery address.
 * @apiSuccess (201) {String} order.status Order status.
 * @apiSuccess (201) {Number} order.total_price Total price.
 * @apiSuccess (201) {Object[]} products List of products in the order.
 * @apiSuccess (201) {Number} products.product_id Product's unique ID.
 * @apiError (400) {String} message Failed to create order.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "Order created",
 *     "order": {
 *       "customer_id": 1,
 *       "delivery_address": "1234 Main Street",
 *       "status": "processing",
 *       "total_price": 9.99
 *     },
 *     "products": [
 *       {
 *         "product_id": 1
 *       },
 *       {
 *         "product_id": 3
 *       },
 *       {
 *         "product_id": 3
 *       },
 *       {
 *         "product_id": 7
 *       }
 *     ]
 *   }
 */
const postOrder = async (req, res) => {
  const {order, products} = req.body;
  const result = await addOrder(order, products);
  if (!result) {
    return res.status(400).json({message: "Failed to create order"});
  }
  res.status(201).json(result);
}

/**
 * @api {put} /orders/:id Update an Order
 * @apiName PutOrder
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiParam {Object} order Order information.
 * @apiParam {Number} [order.customer_id] Customer's unique ID.
 * @apiParam {String} [order.delivery_address] Delivery address.
 * @apiParam {String} [order.status] Order status.
 * @apiParam {Number} [order.total_price] Total price.
 * @apiSuccess (200) {String} message Order update status message.
 * @apiSuccess (200) {Object} order Order information.
 * @apiSuccess (200) {Number} order.customer_id Customer's unique ID.
 * @apiSuccess (200) {String} order.delivery_address Delivery address.
 * @apiSuccess (200) {String} order.status Order status.
 * @apiSuccess (200) {Number} order.total_price Total price.
 * @apiError (400) {String} message Update failed.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *  "message": "Order updated",
 *  "order": {
 *  "customer_id": 1,
 *  "delivery_address": "1234 Main Street",
 *  "status": "delivered",
 *  "total_price": 9.99
 *  }
 *  }
 */
const putOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body;
  const result = await updateOrder(id, order);
  if (result) {
    res.json({message: 'Order updated', order});
  } else {
    res.status(400).json({message: 'Update failed'});
  }
};

/**
 * @api {delete} /orders/:id Delete an Order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiSuccess (200) {Object} message Success message and the ID of the deleted order.
 * @apiError (400) {String} message Failed to delete order.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *  "message": "Order deleted",
 *  "id": "1337"
 *  }
 */
const deleteOrder = async (req, res) => {
  const result = await removeOrder(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

/**
 * @api {get} /orders/:id/items Request Ordered Items by Order ID
 * @apiName GetOrderedItemsByOrderId
 * @apiGroup Order
 * @apiParam {Number} id Order's unique ID.
 * @apiSuccess (200) {Object[]} orderedItems List of ordered items.
 * @apiSuccess (200) {Number} orderedItems.order_item_id Order item's unique ID.
 * @apiSuccess (200) {Number} orderedItems.order_id Order's unique ID.
 * @apiSuccess (200) {Number} orderedItems.product_id Product's unique ID.
 * @apiSuccess (200) {String} orderedItems.name Product's name.
 * @apiError (404) {String} message No ordered items found.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "order_item_id": 252,
 *       "order_id": 122,
 *       "product_id": 1,
 *       "name": "Margherita"
 *     },
 *     {
 *       "order_item_id": 253,
 *       "order_id": 122,
 *       "product_id": 2,
 *       "name": "Pepperoni"
 *     }
 *   ]
 */
const getOrderedItemsByOrderId = async (req, res) => {
  const orderedItems = await findOrderedItemsByOrderId(req.params.id);
  if (!orderedItems) {
    return res.status(404).json({message: "No ordered items found"});
  }
  return res.status(200).json(orderedItems);

}


export {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getOrderedItemsByOrderId,
  postOrder,
  putOrder,
  deleteOrder
};
