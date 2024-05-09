import {
  listAllUsers,
  findUserById,
  getUserByEmail,
  addUser,
  updateUser,
  removeUser
} from "../models/user-model.js";

import bcrypt from "bcrypt";

/**
 * @api {get} /users Request all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess (200) {Object[]} users List of users.
 * @apiSuccess (200) {Number} user.id User's unique ID.
 * @apiSuccess (200) {String} user.first_name User's first name.
 * @apiSuccess (200) {String} user.last_name User's last name.
 * @apiSuccess (200) {String} user.email User's email.
 * @apiSuccess (200) {String} user.phone User's phone number.
 * @apiSuccess (200) {String} user.address User's address.
 * @apiSuccess (200) {String} user.password User's password.
 * @apiSuccess (200) {String} user.role User's role.
 * @apiError (404) {String} message No users found.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *    "users": [
 *      {
 *        "id": 1,
 *        "first_name": "John",
 *        "last_name": "Doe",
 *        "email": "john.doe@mail.com",
 *        "phone": "123456789",
 *        "address": "1234 Main Street",
 *        "password": "hashedpassword",
 *        "role": "user",
 *      },
 *    ]
 *    }
 */
const getUsers = async (req, res) => {
  const users = res.json(await listAllUsers());
  if (!users) {
    return res.status(404).json({message: "No users found"});
  }
  return res.status(200).json(users);
};

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 * @apiParam {Number} id Users unique ID.
 * @apiSuccess (200) {Object} user User information.
 * @apiSuccess (200) {Number} user.id User's unique ID.
 * @apiSuccess (200) {String} user.first_name User's first name.
 * @apiSuccess (200) {String} user.last_name User's last name.
 * @apiSuccess (200) {String} user.email User's email.
 * @apiSuccess (200) {String} user.phone User's phone number.
 * @apiSuccess (200) {String} user.address User's address.
 * @apiSuccess (200) {String} user.password User's password.
 * @apiSuccess (200) {String} user.role User's role.
 * @apiError (404) {String} message User not found.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *    "user": {
 *    "id": 1,
 *    "first_name": "John",
 *    "last_name": "Doe",
 *    "email": "john.doe@mail.com",
 *    "phone": "123456789",
 *    "address": "1234 Main Street",
 *    "password": "hashedpassword",
 *    "role": "user",
 *    }
 */
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  return res.status(200).json(user);
};

/**
 * @api {post} /users Create a new User
 * @apiName PostUser
 * @apiGroup User
 * @apiParam {String} first_name User's first name.
 * @apiParam {String} last_name User's last name.
 * @apiParam {String} email User's email.
 * @apiParam {String} phone User's phone number.
 * @apiParam {String} address User's address.
 * @apiParam {String} password User's password.
 * @apiParam {String} role User's role.
 * @apiSuccess (201) {String} message Signup succesfull.
 * @apiSuccess (201) {Object} user User information.
 * @apiError (400) {String} message Email already in use.
 * @apiError (400) {String} message Failed to create user.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 201 OK
 *    {
 *    "message": "Signup succesfull",
 *    "user": {
 *    "id": 1,
 *    "first_name": "John",
 *    "last_name": "Doe",
 *    "email": john.doe@mail.com",
 *    "phone": "123456789",
 *    "address": "1234 Main Street",
 *    "password": "hashedpassword",
 *    "role": "user",
 */
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

/**
 * @api {put} /users/:id Update User information
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission admin
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Users unique ID.
 * @apiParam {String} [first_name] User's first name.
 * @apiParam {String} [last_name] User's last name.
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [phone] User's phone number.
 * @apiParam {String} [address] User's address.
 * @apiParam {String} [password] User's password.
 * @apiParam {String} [role] User's role.
 * @apiSuccess (200) {Object} user User information.
 * @apiError (400) {String} message Failed to update user.
 * @apiError (403) {String} message Forbidden.
 * @apiError (500) {String} message Internal server error
 */
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

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiHeader {String} Authorization Bearer token.
 * @apiParam {Number} id Users unique ID.
 * @apiSuccess (200) {Object} message Success message and the ID of the deleted user.
 * @apiError (403) {String} message Forbidden.
 * @apiError (400) {String} message Failed to delete user.
 * @apiError (500) {String} message Internal server error
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "User deleted",
 *      "id": "1337"
 *    }
 */
const deleteUser = async (req, res) => {
  if (
    res.locals.user.id !== Number(req.params.id) &&
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
