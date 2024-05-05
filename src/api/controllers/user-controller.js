import {
  listAllUsers,
  findUserById,
  getUserByEmail,
  addUser,
  updateUser,
  removeUser
} from "../models/user-model.js";

import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  const users = res.json(await listAllUsers());
  if (!users) {
    return res.status(404).json({message: "No users found"});
  }
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  return res.status(200).json(user);
};


const postUser = async (req, res) => {
  const emailInUse = await getUserByEmail(req.body.email);
  if (emailInUse) {
    return res.status(400).json({message: "Email already in use"});
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (!result) {
    return res.status(400).json({message: "Failed to create user"});
  }
  res.status(201).json({message: "Signup succesfull", "user": result});
};

const putUser = async (req, res) => {
  if (
    res.locals.user.id !== Number(req.params.id) &&
    res.locals.user.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }

  const result = await updateUser(req.params.id, req.body);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (
    res.locals.user.user_id !== Number(req.params.id) &&
    res.locals.user.role !== 'admin'
  ) {
    res.sendStatus(403);
    return;
  }
  const result = await removeUser(req.params.id);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

export { getUsers, getUserById, postUser, putUser, deleteUser };
