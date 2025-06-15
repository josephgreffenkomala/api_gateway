import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const excludedPaths = ['/health','/auth/']; // Path yang dikecualikan
  if (excludedPaths.some(path => req.path.startsWith(path))) {
    return next(); // Lewati validasi JWT untuk path yang dikecualikan
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization token missing or invalid' });
    return; // Pastikan middleware berhenti di sini
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.AUTH_JWT_SECRET); // Validasi token
    (req as any).user = decoded; // Simpan payload token ke `req.user`
    next(); // Lanjutkan ke middleware berikutnya
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // Pastikan middleware berhenti di sini
  }
};