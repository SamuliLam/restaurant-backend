import express from "express";
import {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getOrderedItemsByOrderId,
  postOrder,
  putOrder,
  deleteOrder
} from "../controllers/order-controller.js";

const orderRouter = express.Router();

orderRouter.route("/").get(getOrders).post(postOrder);

orderRouter.route("/:id").get(getOrderById).put(putOrder).delete(deleteOrder);

orderRouter.route("/:id/items").get(getOrderedItemsByOrderId);

orderRouter.route("/customer/:customerId").get(getOrdersByCustomerId);

export default orderRouter;
