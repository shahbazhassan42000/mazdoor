import config from '../config';
const { expressjwt: jwt } = require("express-jwt");

function getTokenFromHeader(req) {
  console.log(req.headers);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

let auth = {
  required: jwt({
    secret: config.secretKey,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
    algorithms: ['HS256']
  })
};

export default auth;
