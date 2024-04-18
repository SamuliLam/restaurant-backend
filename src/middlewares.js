import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(res.locals.user);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export { authenticateToken };
