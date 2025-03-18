import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../models/user-model.js';
import "dotenv/config";

/**
 * @api {post} /auth/login User Login
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 * @apiSuccess (200) {Object} user User's information.
 * @apiSuccess (200) {String} token JWT token.
 * @apiSuccess (200) {String} message Login status message.
 * @apiError (401) {String} message Incorrect email or password.
 * @apiError (500) {String} message Internal server error.
 * @apiError (400) {String} message Bad request.
 */
const postLogin = async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});

  res.status(200).json({user, token, message: 'Login successful'});
};

/**
 * @api {get} /auth/me Get Current User
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiSuccess (200) {Object} user User's information.
 * @apiSuccess (200) {String} message Token status message.
 * @apiError (401) {String} message Token is invalid.
 * @apiError (403) {String} message Not an admin.
 */
const getMe = async (req, res) => {
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
}

function authenticateAdmin(req, res, next) {
  if (res.locals.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Not an admin' });
  }
}

export { postLogin, getMe, authenticateAdmin};
