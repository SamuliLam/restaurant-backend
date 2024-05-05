import express from "express";
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser
} from "../controllers/user-controller.js";
import {getUserByEmail} from "../models/user-model.js";
import {authenticateToken} from "../../middlewares.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(postUser);

userRouter.route("/:id").get(getUserById).post(authenticateToken, putUser).delete(deleteUser);

userRouter.route("/:email").get(getUserByEmail);

export default userRouter;
