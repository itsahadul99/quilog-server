import { Request, Response, NextFunction } from 'express';

interface ErrorType extends Error {
  status?: number;
}

const errorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
  });
};

export default errorHandler;

