import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role, User } from '../types/user';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as User;
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorizeRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};