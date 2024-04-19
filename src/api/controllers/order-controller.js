import {
  listAllOrders,
  findOrderById,
  findOrdersByCustomerId,
  addOrder,
  updateOrder,
  removeOrder,
} from "../models/order-model.js";

const getOrders = async (req, res) => {
  const orders = await listAllOrders();
  if (!orders) {
    return res.status(404).json({ message: "No orders found" });
  }
  return res.status(200).json(orders);
};

const getOrderById = async (req, res) => {
  const order = await findOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json(order);
};

const getOrdersByCustomerId = async (req, res) => {
  const orders = await findOrdersByCustomerId(req.params.customerId);
  if (!orders) {
    return res.status(404).json({ message: "No orders found" });
  }
  return res.status(200).json(orders);
};

const postOrder = async (req, res) => {
  const { order, products } = req.body;
  const result = await addOrder(order, products);
  if (!result) {
    return res.status(400).json({ message: "Failed to create order" });
  }
  res.status(201).json(result);
}

const putOrder = async (req, res) => {
  const result = await updateOrder(req.body, req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteOrder = async (req, res) => {
  const result = await removeOrder(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export { getOrders, getOrderById, getOrdersByCustomerId, postOrder, putOrder, deleteOrder };
