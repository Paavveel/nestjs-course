import type { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.originalUrl} ${req.httpVersion}`);
  next();
};
