import type { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('uncaugh Error ', err);
  return res.status(500).send('oops!!');
};
