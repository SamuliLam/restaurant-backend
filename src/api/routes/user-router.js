import express from "express";
import {
  getUserById,
  getUsers,
  postUser,
  putUser,
  deleteUser
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(postUser);

userRouter.route("/:id").get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
