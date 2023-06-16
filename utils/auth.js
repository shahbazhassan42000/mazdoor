import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

let auth = {
  required: expressjwt( {
    secret: process.env.SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
  })
};

export default auth;
