import jwt from 'jsonwebtoken';
import config from '../config';

const { secretKey } = config;

export default {
  authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthenticated' });
      }
      req.user = user;
      next();
    });
  },
  authorize(roles = []) {
    if (typeof roles === 'string') {
      roles = [roles];
    }

    return [
      // authorize based on user role
      (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
          // user's role is not authorized
          return res.status(403).json({ message: 'Unauthorized' });
        }

        // authentication and authorization successful
        next();
      },
    ];
  },
};
