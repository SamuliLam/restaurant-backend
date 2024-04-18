import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../models/user-model.js';
import "dotenv/config";

const postLogin = async (req, res) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    return res.status(401);
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401);
  }
  delete user.password;

  const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'});

  res.json({user, token});
};

const getMe = async (req, res) => {
  if (res.locals.user) {
    res.json({message: 'token ok', user: res.locals.user});
  } else {
    res.sendStatus(401);
  }
}

export { postLogin, getMe };